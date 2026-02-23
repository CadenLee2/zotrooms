import {StudyRoom, ReviewMap} from '../types/types';

const LOCATIONS = [
    "Gateway Study Center",
    "Science Library",
    "Multimedia Resources Center",
    "Langson Library"
];

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
