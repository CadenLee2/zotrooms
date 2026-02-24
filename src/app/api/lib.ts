import {Pool} from "pg";
import z from "zod";

export function pushBindFactory(bindVals: unknown[]) {
    return (val: unknown) => {
        bindVals.push(val);
        return `$${bindVals.length}`;
    }
}

async function initDb(pool: Pool) {
    await pool.query(`
        create table if not exists room
        (
            id            varchar primary key not null,
            location      varchar             not null,
            name          varchar             not null,
            capacity      integer             not null,
            description   varchar             not null,
            directions    varchar             not null,
            tech_enhanced boolean             not null,
            url           varchar             not null
        );

        create table if not exists review
        (
            id          uuid primary key not null default gen_random_uuid(),
            room_id     varchar unique   not null references room (id),
            rating      int              not null check (rating >= 1 and rating <= 5),
            explanation varchar          not null
        );
    `);

    const roomSchema = z.object({
        id: z.string(),
        name: z.string().nonempty(),
        capacity: z.number().int(),
        location: z.string(),
        description: z.string(),
        directions: z.string(),
        techEnhanced: z.boolean(),
        url: z.string(),
    })

    const roomsRaw = (await fetch("https://anteaterapi.com/v2/rest/studyRooms").then(r => r.json()))?.data as unknown[];
    // filter out plaza verde because i don't feel like it
    const rooms = roomsRaw
        .map(r => roomSchema.safeParse(r))
        .filter(r => r.success)
        .map(r => r.data);

    let query = `insert into room (id, location, name, capacity, description, directions, tech_enhanced, url)
    values `
    let roomsSoFar = 0;
    const bindVals = [] as unknown[];
    const pb = pushBindFactory(bindVals)
    for (const room of rooms) {
        query += `(${pb(room.id)}, ${pb(room.location)}, ${pb(room.name)}, ${pb(room.capacity)}, ${pb(room.description)}, ${pb(room.directions)}, ${pb(room.techEnhanced)}, ${pb(room.url)})`
        if (roomsSoFar != rooms.length - 1) {
            query += ", "
        }
        ++roomsSoFar;
    }

    query += " on conflict (id) do update set " +
        "location = excluded.location, " +
        "name = excluded.name, " +
        "capacity = excluded.capacity, " +
        "description = excluded.description, " +
        "directions = excluded.directions, " +
        "tech_enhanced = excluded.tech_enhanced;"

    await pool.query(query, bindVals)
}

async function makePool() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 5,
    });

    await initDb(pool);

    return pool
}

export const pool = await makePool();