-- Roles via enum for integrity
CREATE TYPE user_role AS ENUM ('customer','cleaner','admin');
CREATE TYPE booking_status AS ENUM ('pending','confirmed','in_progress','completed','canceled','no_show'); 
CREATE TYPE payment_status AS ENUM ('unpaid','authorized','paid','refunded','failed');  
CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS btree_gist;



CREATE TABLE users (
  user_id           BIGSERIAL PRIMARY KEY,
  role              user_role NOT NULL,
  full_name         TEXT NOT NULL,
  email             CITEXT UNIQUE,               -- enable citext extension for case-insensitive email 
  phone_e164        TEXT,
  password_hash     TEXT,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);  

CREATE TABLE addresses (
  address_id        BIGSERIAL PRIMARY KEY,
  user_id           BIGINT REFERENCES users(user_id) ON DELETE SET NULL,
  label             TEXT,                        -- e.g., "Home", "Office" 
  line1             TEXT NOT NULL,
  line2             TEXT,
  city              TEXT NOT NULL,
  state             TEXT,
  postal_code       TEXT,
  country_code      CHAR(2) NOT NULL,
  latitude          DOUBLE PRECISION,
  longitude         DOUBLE PRECISION,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);  

CREATE TABLE cleaners (
  cleaner_id        BIGINT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
  bio               TEXT,
  avg_rating        NUMERIC(3,2) NOT NULL DEFAULT 0,     -- derived but cached for speed [web:9]
  completed_jobs    INTEGER NOT NULL DEFAULT 0,
  cancellation_rate NUMERIC(5,2) NOT NULL DEFAULT 0      -- computed from history; materialized/cached [web:9]
);  

CREATE TABLE services (
  service_id        BIGSERIAL PRIMARY KEY,
  name              TEXT NOT NULL,
  description       TEXT,
  base_duration_min INTEGER NOT NULL,        -- e.g., 120
  base_price_cents  INTEGER NOT NULL,        -- store money as integer cents
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);  

CREATE TABLE service_addons (
  addon_id          BIGSERIAL PRIMARY KEY,
  service_id        BIGINT NOT NULL REFERENCES services(service_id) ON DELETE CASCADE,
  name              TEXT NOT NULL,
  extra_duration_min INTEGER NOT NULL DEFAULT 0,
  extra_price_cents  INTEGER NOT NULL DEFAULT 0,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE
);  -- [web:6][web:18]

CREATE TABLE cleaner_service_skills (
  cleaner_id        BIGINT NOT NULL REFERENCES cleaners(cleaner_id) ON DELETE CASCADE,
  service_id        BIGINT NOT NULL REFERENCES services(service_id) ON DELETE CASCADE,
  is_enabled        BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (cleaner_id, service_id)
);  

CREATE TABLE service_areas (
  area_id           BIGSERIAL PRIMARY KEY,
  name              TEXT NOT NULL,
  polygon_geojson   JSONB,                    -- or PostGIS geometry for real geofencing [web:18]
  is_active         BOOLEAN NOT NULL DEFAULT TRUE
);  

CREATE TABLE cleaner_service_areas (
  cleaner_id        BIGINT NOT NULL REFERENCES cleaners(cleaner_id) ON DELETE CASCADE,
  area_id           BIGINT NOT NULL REFERENCES service_areas(area_id) ON DELETE CASCADE,
  PRIMARY KEY (cleaner_id, area_id)
);  

CREATE TABLE availability (
  availability_id   BIGSERIAL PRIMARY KEY,
  cleaner_id        BIGINT NOT NULL REFERENCES cleaners(cleaner_id) ON DELETE CASCADE,
  weekday           SMALLINT CHECK (weekday BETWEEN 0 AND 6),   -- 0=Sun [web:18]
  start_time        TIME NOT NULL,
  end_time          TIME NOT NULL,
  effective_from    DATE NOT NULL DEFAULT CURRENT_DATE,
  effective_to      DATE,
  CHECK (start_time < end_time)
);  

CREATE TABLE time_off (
  time_off_id       BIGSERIAL PRIMARY KEY,
  cleaner_id        BIGINT NOT NULL REFERENCES cleaners(cleaner_id) ON DELETE CASCADE,
  starts_at         TIMESTAMPTZ NOT NULL,
  ends_at           TIMESTAMPTZ NOT NULL,
  reason            TEXT,
  CHECK (starts_at < ends_at)
); 

CREATE TABLE appointments (
  appointment_id    BIGSERIAL PRIMARY KEY,
  customer_id       BIGINT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  cleaner_id        BIGINT REFERENCES cleaners(cleaner_id) ON DELETE SET NULL,
  service_id        BIGINT NOT NULL REFERENCES services(service_id) ON DELETE RESTRICT,
  address_id        BIGINT NOT NULL REFERENCES addresses(address_id) ON DELETE RESTRICT,
  start_at          TIMESTAMPTZ NOT NULL,
  end_at            TIMESTAMPTZ NOT NULL,
  status            booking_status NOT NULL DEFAULT 'pending',
  -- pricing snapshot (immutable for audit/billing)
  price_cents       INTEGER NOT NULL,
  currency          CHAR(3) NOT NULL DEFAULT 'USD',
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (start_at < end_at)
);  

CREATE TABLE appointment_addons (
  appointment_id    BIGINT NOT NULL REFERENCES appointments(appointment_id) ON DELETE CASCADE,
  addon_id          BIGINT NOT NULL REFERENCES service_addons(addon_id) ON DELETE RESTRICT,
  addon_price_cents INTEGER NOT NULL,
  addon_duration_min INTEGER NOT NULL,
  PRIMARY KEY (appointment_id, addon_id)
);

-- Prevent cleaner double-booking via exclusion constraint (requires btree_gist)
-- CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE appointments
  ADD CONSTRAINT no_overlap_per_cleaner
  EXCLUDE USING gist (
    cleaner_id WITH =,
    tstzrange(start_at, end_at, '[)') WITH &&
  )
  WHERE (cleaner_id IS NOT NULL AND status IN ('pending','confirmed','in_progress')); 

CREATE TABLE payments (
  payment_id        BIGSERIAL PRIMARY KEY,
  appointment_id    BIGINT NOT NULL REFERENCES appointments(appointment_id) ON DELETE CASCADE,
  amount_cents      INTEGER NOT NULL,
  currency          CHAR(3) NOT NULL DEFAULT 'USD',
  payment_status    payment_status NOT NULL DEFAULT 'unpaid',
  provider          TEXT,           -- e.g., Stripe [web:6]
  provider_ref      TEXT,           -- charge id / intent id [web:6]
  captured_at       TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
); 

CREATE TABLE reviews (
  review_id         BIGSERIAL PRIMARY KEY,
  appointment_id    BIGINT UNIQUE NOT NULL REFERENCES appointments(appointment_id) ON DELETE CASCADE,
  customer_id       BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  cleaner_id        BIGINT NOT NULL REFERENCES cleaners(cleaner_id) ON DELETE CASCADE,
  rating            INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment           TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
); 

-- Dispatch queue to contact cleaners in order for a new request
CREATE TABLE dispatch_requests (
  request_id        BIGSERIAL PRIMARY KEY,
  appointment_id    BIGINT NOT NULL REFERENCES appointments(appointment_id) ON DELETE CASCADE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  status            TEXT NOT NULL DEFAULT 'open'  -- open, fulfilled, expired, canceled 
);  

CREATE TABLE dispatch_candidates (
  request_id        BIGINT NOT NULL REFERENCES dispatch_requests(request_id) ON DELETE CASCADE,
  cleaner_id        BIGINT NOT NULL REFERENCES cleaners(cleaner_id) ON DELETE CASCADE,
  rank_score        NUMERIC(6,3) NOT NULL,      -- computed from rating & cancellation rate [web:9]
  invited_at        TIMESTAMPTZ,
  responded_at      TIMESTAMPTZ,
  response          TEXT,                       -- accept, decline, timeout 
  PRIMARY KEY (request_id, cleaner_id)
);  

-- Recurrence support
CREATE TYPE recur_freq AS ENUM ('weekly','biweekly','monthly'); 
CREATE TABLE recurrences (
  recurrence_id     BIGSERIAL PRIMARY KEY,
  customer_id       BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  cleaner_id        BIGINT REFERENCES cleaners(cleaner_id) ON DELETE SET NULL,
  service_id        BIGINT NOT NULL REFERENCES services(service_id) ON DELETE RESTRICT,
  address_id        BIGINT NOT NULL REFERENCES addresses(address_id) ON DELETE RESTRICT,
  freq              recur_freq NOT NULL,
  weekday           SMALLINT CHECK (weekday BETWEEN 0 AND 6),
  start_time        TIME NOT NULL,
  start_date        DATE NOT NULL,
  end_date          DATE,
  notes             TEXT,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);  