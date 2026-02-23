import {pool} from "../lib";
import z from "zod";

const getQuerySchema = z.object({
    location: z.string().optional(),
    capacityMin: z.coerce.number().int().optional(),
    capacityMax: z.coerce.number().int().optional(),
    isTechEnhanced: z.coerce.boolean().optional(),
    search: z.string().optional(),
})

const roomSchema = z.object({
    id: z.string(),
    name: z.string(),
    capacity: z.number().int().nullable(),
    location: z.string(),
    description: z.string().optional(),
    directions: z.string().optional(),
    techEnhanced: z.boolean().nullable(),
    url: z.string(),
})

export async function GET(req: Request) {
    const p = Object.fromEntries(new URL(req.url).searchParams.entries());
    const parse = getQuerySchema.safeParse(p);
    if (!parse.success) {
        return Response.json(JSON.parse(parse.error.message), {status: 400});
    }

    const newSearchParams = new URLSearchParams();
    const parsed = parse.data;
    for (const k in parsed) {
        const kSafe = k as keyof typeof parsed;
        if (parsed[kSafe]) {
            newSearchParams.set(kSafe, parsed[kSafe].toString());
        }
    }

    const tryAnteaterAPI = await fetch(`https://anteaterapi.com/v2/rest/studyRooms?${newSearchParams.toString()}`);
    if (!tryAnteaterAPI.ok) {
        return Response.json({error: "bad roomId"}, {status: 400});
    }

    const {data: upstream} = await tryAnteaterAPI.json();
    const parsedUpstream = z.array(roomSchema).parse(upstream)
        .filter(r => !parsed.search || r.name.toLowerCase().includes(parsed.search.toLowerCase()));

    return Response.json(parsedUpstream);
}