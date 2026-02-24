import {StudyRoom, ReviewMap, ReviewWithId} from '@/types/types';

export async function getRated(): Promise<StudyRoom[]> {
    return fetch("/api/room?ratedOnly=1").then(r => r.json());
}

export async function getAllRooms(): Promise<StudyRoom[]> {
    return fetch("/api/room").then(r => r.json())
}

export async function getByLocation(location: string, page: number, perPage: number): Promise<StudyRoom[]> {
    const resp = await fetch(`/api/room?location=${encodeURIComponent(location)}`).then(r => r.json());
    return resp.slice(page * perPage, perPage);
}

export async function getById(id: string): Promise<StudyRoom> {
    const [one] = await fetch(`/api/room?id=${encodeURIComponent(id)}`).then(r => r.json());
    return one;
}

export async function keywordSearch(keywords: string): Promise<StudyRoom[]> {
    return fetch(`/api/room?search=${keywords}`).then(r => r.json());
}

export async function getReviews(): Promise<ReviewMap> {
    return fetch("/api/review").then(r => r.json())
}

export async function updateReview(review: ReviewWithId): Promise<boolean> {
    return fetch("/api/review", {
        method: "POST",
        body: JSON.stringify(review)
    }).then(r => r.ok)
}

export async function deleteReview(roomId: string): Promise<boolean> {
    return fetch("/api/review", {
        method: "DELETE",
        body: JSON.stringify({ roomId })
    }).then(r => r.ok)
}
