import { pool } from "../lib";
import z from "zod";

export async function GET() {
    return Response.json(
        await pool.query("select room_id, rating, explanation from review;")
            .then(({ rows }) => rows)
    );
}

const newReviewSchema = z.object({
    roomId: z.string(),
    rating: z.int().min(1).max(5),
    explanation: z.string(),
})

export async function POST(req: Request) {
    const parse = newReviewSchema.safeParse(await req.json().catch(() => ({})));
    if (!parse.success) {
        return Response.json(JSON.parse(parse.error.message), { status: 400 });
    }

    const parsed = parse.data;

    const [tryAnteaterAPI] = await pool.query("select count(1) from room where id = $1;", [parsed.roomId]).then(r => r.rows);
    if (!tryAnteaterAPI) {
        return Response.json({ error: "bad roomId" }, { status: 400 });
    }

    const result = await pool.query("insert into review (room_id, rating, explanation) values ($1, $2, $3) on conflict do nothing returning id, room_id, rating, explanation;", [parsed.roomId, parsed.rating, parsed.explanation]);

    if (result.rowCount == 0) {
        return Response.json({ error: "duplicate review for this room" }, { status: 409 });
    }

    return Response.json(result.rows[0]);
}
