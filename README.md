# express-pg-min

Minimal Express + PostgreSQL scaffold with pg Pool, dotenv, and a sample users CRUD.

## Setup
1. Create database (psql):
   - CREATE DATABASE mydb;
   - \c mydb
   - -- user and password as needed

2. Configure environment:
   - Copy .env and set DATABASE_URL

3. Install:
   - npm install

4. Run:
   - npm run dev  # with nodemon
   - npm start    # plain node

5. Test:
   - curl http://localhost:3000/health
   - curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Ada","email":"ada@example.com"}'
   - curl http://localhost:3000/users
