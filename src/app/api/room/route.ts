import {pool, pushBindFactory} from "../lib";
import z from "zod";

const getQuerySchema = z.object({
    id: z.string().optional(),
    location: z.string().optional(),
    ratedOnly: z.coerce.boolean().optional(),
    search: z.string().optional(),
})

export async function GET(req: Request) {
    const p = Object.fromEntries(new URL(req.url).searchParams.entries());
    const queryParse = getQuerySchema.safeParse(p);
    if (!queryParse.success) {
        return Response.json(JSON.parse(queryParse.error.message), {status: 400});
    }
    const queryParsed = queryParse.data;

    let query = `select room.id, location, name, capacity, description, directions, tech_enhanced
                 from room
                          left join review on room.id = review.room_id
                 where true`;
    const bindVals = [] as unknown[];
    const pb = pushBindFactory(bindVals);
    if (queryParsed.id) {
        query += ` and room.id = ${pb(queryParsed.id)}`;
    }
    if (queryParsed.location) {
        query += ` and location = ${pb(queryParsed.location)}`;
    }
    if (queryParsed.search) {
        const searchBound = pb(`%${queryParsed.search}%`);
        query += ` and (name ilike ${searchBound} or location ilike ${searchBound} or description ilike ${searchBound})`;
    }
    if (queryParsed.ratedOnly) {
        query += ` and review.id is not null`;
    }
    query += ";"

    const rooms = await pool.query(query, bindVals).then(r => r.rows.map(r => {
        return {
            id: r.id as string,
            location: r.location as string,
            name: r.name as string,
            capacity: r.capacity as number,
            description: r.description as string,
            directions: r.directions as string,
            techEnhanced: r.techEnhanced as boolean,
        }
    }));

    return Response.json(rooms);
}
