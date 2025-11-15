const bcrypt = require("bcrypt");
const pool = require("./db");

async function seedAll() {
  try {
    await pool.query("BEGIN");

    // Seed users
    const password_hash = await bcrypt.hash("testpass123", 10);
    const users = [
      [
        "customer",
        "Alice Example",
        "alice@example.com",
        "+15550000001",
        password_hash,
      ],
      [
        "customer",
        "Bob Example",
        "bob@example.com",
        "+15550000002",
        password_hash,
      ],
      [
        "customer",
        "Carol Example",
        "carol@example.com",
        "+15550000003",
        password_hash,
      ],
      [
        "cleaner",
        "Dan Example",
        "dan@example.com",
        "+15550000004",
        password_hash,
      ],
      [
        "admin",
        "Eve Example",
        "eve@example.com",
        "+15550000005",
        password_hash,
      ],
    ];
    for (const u of users) {
      await pool.query(
        `INSERT INTO users (role, full_name, email, phone_e164, password_hash)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (email) DO NOTHING`,
        u
      );
    }

    // Get inserted users to reference later
    const { rows: allUsers } = await pool.query(
      `SELECT user_id, role FROM users WHERE email = ANY($1::text[])`,
      [users.map((u) => u[2])]
    );
    const customers = allUsers
      .filter((u) => u.role === "customer")
      .map((u) => u.user_id);
    const cleaners = allUsers
      .filter((u) => u.role === "cleaner")
      .map((u) => u.user_id);

    // Seed cleaners (for cleaner users)
    for (let i = 0; i < cleaners.length; i++) {
      const cleaner_id = cleaners[i];
      await pool.query(
        `INSERT INTO cleaners (cleaner_id, bio, avg_rating, completed_jobs, cancellation_rate)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (cleaner_id) DO NOTHING`,
        [cleaner_id, `Bio ${i + 1}`, 4.5 - i * 0.5, i * 5, i * 2.5]
      );
    }

    // Seed addresses linked to users (5 addresses)
    for (let i = 0; i < 5; i++) {
      await pool.query(
        `INSERT INTO addresses (user_id, label, line1, city, country_code)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT DO NOTHING`,
        [
          allUsers[i].user_id,
          `Home ${i + 1}`,
          `${i + 1} Example St`,
          "TestCity",
          "US",
        ]
      );
    }

    // Seed services
    for (let i = 0; i < 5; i++) {
      await pool.query(
        `INSERT INTO services (name, description, base_duration_min, base_price_cents)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (name) DO NOTHING`,
        [
          `Service ${i + 1}`,
          `Description ${i + 1}`,
          60 + i * 15,
          5000 + i * 1000,
        ]
      );
    }

    // Get service IDs for appointments
    const { rows: serviceRows } = await pool.query(
      `SELECT service_id FROM services ORDER BY service_id LIMIT 5`
    );

    // Get address IDs for appointments
    const { rows: addressRows } = await pool.query(
      `SELECT address_id FROM addresses ORDER BY address_id LIMIT 5`
    );

    // Seed appointments
    for (let i = 0; i < 5; i++) {
      await pool.query(
        `INSERT INTO appointments (customer_id, cleaner_id, service_id, address_id, start_at, end_at, status, price_cents, currency, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT DO NOTHING`,
        [
          customers[i % customers.length],
          cleaners[i % cleaners.length],
          serviceRows[i].service_id,
          addressRows[i].address_id,
          `2025-12-0${i + 1}T09:00:00Z`,
          `2025-12-0${i + 1}T11:00:00Z`,
          "confirmed",
          5500 + i * 500,
          "USD",
          `Appointment note ${i + 1}`,
        ]
      );
    }

    // Get appointment IDs for payments and reviews
    const { rows: appointmentRows } = await pool.query(
      `SELECT appointment_id, customer_id, cleaner_id FROM appointments ORDER BY appointment_id LIMIT 5`
    );

    // Seed payments
    for (let i = 0; i < 5; i++) {
      const appointment = appointmentRows[i];
      await pool.query(
        `INSERT INTO payments (appointment_id, amount_cents, currency, payment_status, provider, provider_ref)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT DO NOTHING`,
        [
          appointment.appointment_id,
          5500 + i * 500,
          "USD",
          "paid",
          "stripe",
          `ch_123456${i + 1}`,
        ]
      );
    }

    // Seed reviews
    for (let i = 0; i < 5; i++) {
      const appointment = appointmentRows[i];
      await pool.query(
        `INSERT INTO reviews (appointment_id, customer_id, cleaner_id, rating, comment)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT DO NOTHING`,
        [
          appointment.appointment_id,
          appointment.customer_id,
          appointment.cleaner_id,
          5 - i,
          `Review ${i + 1}`,
        ]
      );
    }

    await pool.query("COMMIT");
    console.log("All tables seeded successfully!");
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Seeding failed:", err);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  seedAll();
}

module.exports = { seedAll };

