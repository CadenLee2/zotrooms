# Zotrooms

Zotrooms is a demo project for ICSSC's deployment workshop at IrvineHacks 2026. It lets you rate study rooms on campus.

## Running locally
1. Clone this repository: `git clone https://github.com/CadenLee2/zotrooms`
2. `npm install`
3. Set up a PostgreSQL database and configure the URL in your `.env` file (see [Configuration](#configuration))
4. `npm run dev` and visit <http://localhost:3000>

## Deployment
Use Railway!

## Configuration
This project requires a PostgreSQL database to store data persistently. You'll have to set one up:
- Locally: install PostgreSQL and set up a database, or
- Cloud-hosted: use a platform like [Railway](https://railway.com?referralCode=NOW5I_) to make it easy

To configure the database URL:
- Copy `.env.example` into `.env`
- Set `POSTGRES_DB_URL` to your database URL

## Stack
This project uses the following technologies:
- Next.js
- Backend
    - [Anteater API](https://icssc.link/about-anteaterapi)
    - PostgreSQL
- Frontend
    - Next.js
