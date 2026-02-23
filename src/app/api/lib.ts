import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
});

await pool.query(`
create table if not exists review (
    id uuid primary key not null default gen_random_uuid(),
    room_id varchar unique not null,
    rating int not null check (rating >= 1 and rating <= 5),
    explanation varchar not null
);
`);

export { pool };