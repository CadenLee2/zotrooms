# Zotrooms

Zotrooms is a demo project for ICSSC's deployment workshop at IrvineHacks 2026. It lets you rate study rooms on campus.

## Running locally
1. Clone this repository: `git clone https://github.com/CadenLee2/zotrooms`
2. `npm install`
3. `npm run dev`
    - This should work without additional configuration (using the in-memory data mode). If you want to use a database, configure the URL in your `backend/.env` file!

## Deployment
Use Railway!

## Configuration
- If you want to use the in-memory data mode (i.e. will reset every time you restart the server), you don't need to do anything
- If you want to use the Postgres database mode, you will need to:
    - Copy `backend/.env.example` into `backend/.env`
    - Set up a PostgreSQL database somewhere
    - Set `POSTGRES_DB_URL` to your database URL

## Stack
This project uses the following technologies:
- Next.js
- Backend
    - [Anteater API](https://docs.icssc.club/docs/about/anteaterapi)
    - PostgreSQL
- Frontend
    - Next.js
