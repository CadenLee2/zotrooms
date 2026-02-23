import { StudyRoom, ReviewMap } from '../types/types';

const LOCATIONS = [
  "Gateway Study Center",
  "Science Library",
  "Multimedia Resources Center",
  "Langson Library"
];

const EXAMPLE_ROOM: StudyRoom = {
  id: "abc",
  name: "Science 400",
  capacity: 4,
  location: "Science Library",
  description: "a room",
  directions: "down the hall and to the left",
  techEnhanced: true,
  url: "https://example.com/",
  slots: []
};

const EXAMPLE_ROOMS: StudyRoom[] = [
  {
    id: "abc",
    name: "Science 400",
    capacity: 4,
    location: "Science Library",
    description: "a room",
    directions: "down the hall and to the left",
    techEnhanced: true,
    url: "https://example.com/",
    slots: []
  },
  {
    id: "def",
    name: "Science 401",
    capacity: 5,
    location: "Science Library",
    description: "a room",
    directions: "down the hall and to the left",
    techEnhanced: true,
    url: "https://example.com/",
    slots: []
  },
  {
    id: "ghi",
    name: "Science 402",
    capacity: 6,
    location: "Science Library",
    description: "another room",
    directions: "down the hall and to the left",
    techEnhanced: false,
    url: "https://example.com/",
    slots: []
  },
  {
    id: "jkl",
    name: "Langson 392",
    capacity: 8,
    location: "Langson Library",
    description: "another room",
    directions: "up the stairs and to the right",
    techEnhanced: false,
    url: "https://example.com/",
    slots: []
  },
  {
    id: "mno",
    name: "Langson 394",
    capacity: 3,
    location: "Langson Library",
    description: "another room",
    directions: "up the stairs and to the left",
    techEnhanced: false,
    url: "https://example.com/",
    slots: []
  },
];

const MOCK_RATED = EXAMPLE_ROOMS;

const MOCK_REVIEW_MAP: ReviewMap = {
  "ghi": {
    rating: 3,
    explanation: "mid"
  },
  "mno": {
    rating: 5,
    explanation: "peak"
  },
  "abc": {
    rating: 1,
    explanation: "cooked"
  }
};

const mockDelay = () => new Promise(res => setTimeout(res, 300));

export const getRated = async () => {
  await mockDelay();
  return MOCK_RATED;
}

export const getByLocation = async (location: string, page: number, perPage: number) => {
  await mockDelay();
  return EXAMPLE_ROOMS.slice(page * perPage, perPage);
}

export const getById = async (id: string) => {
  await mockDelay();
  return EXAMPLE_ROOMS.find(r => r.id === id);
}

export const keywordSearch = async (keywords: string) => {
  await mockDelay();
  const lowerKeywords = keywords;
  const isMatch = (r: StudyRoom) => (
    r.name.toLowerCase().includes(lowerKeywords) ||
      r.description.toLowerCase().includes(lowerKeywords) ||
      r.location.toLowerCase().includes(lowerKeywords)
  );
  return EXAMPLE_ROOMS.filter(isMatch);
}

export const getReviews = async () => {
  await mockDelay();
  return MOCK_REVIEW_MAP;
}
