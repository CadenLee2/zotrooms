import { pool } from "../lib";
import z from "zod";
import { Review } from "@/types/types";

export async function GET() {
    return Response.json(
        await pool.query("select room_id, rating, explanation from review;")
            .then(({ rows }) => {
                const ret = {} as Record<string, Review>;
                for (const row of rows) {
                    ret[row.room_id] = row;
                }
                return ret;
            })
    );
}

const newReviewSchema = z.object({
    roomId: z.string(),
    rating: z.int().min(1).max(5),
    explanation: z.string(),
})

const deleteSchema = z.object({ roomId: z.string() });

export async function PUT(req: Request) {
    const parse = newReviewSchema.safeParse(await req.json().catch(() => ({})));
    if (!parse.success) {
        return Response.json(JSON.parse(parse.error.message), { status: 400 });
    }

    const parsed = parse.data;

    const [tryAnteaterAPI] = await pool.query("select count(1) from room where id = $1;", [parsed.roomId]).then(r => r.rows);
    if (!tryAnteaterAPI) {
        return Response.json({ error: "bad roomId" }, { status: 400 });
    }

    const result = await pool.query(`
        insert into review (room_id, rating, explanation)
        values ($1, $2, $3)
        on conflict(room_id) do update set rating=excluded.rating, explanation=excluded.explanation
        returning id, room_id, rating, explanation;
    `, [parsed.roomId, parsed.rating, parsed.explanation]);

    if (result.rowCount == 0) {
        return Response.json({ error: "duplicate review for this room" }, { status: 409 });
    }

    return Response.json(result.rows[0]);
}

export async function DELETE(req: Request) {
    const parse = deleteSchema.safeParse(await req.json().catch(() => ({})));
    if (!parse.success) {
        return Response.json(JSON.parse(parse.error.message), { status: 400 });
    }

    const parsed = parse.data;

    const result = await pool.query("delete from review where room_id = $1 returning *;", [parsed.roomId]);

    if (result.rowCount === 0) {
        return Response.json({ error: "could not find room to delete" }, { status: 404 });
    }

    return Response.json(result.rows[0]);
}
