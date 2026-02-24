type StudyRoomSlot = {
  studyRoomId: string,
  start: Date,
  end: Date,
  url: string,
  isAvailable: boolean
};

export type StudyRoom = {
  id: string,
  name: string,
  capacity: number,
  location: string,
  description: string,
  directions: string,
  techEnhanced: boolean,
  url: string,
  slots: StudyRoomSlot[]
};

export type Review = {
  rating: number,
  explanation: string
};

export type ReviewWithId = Review & {
  roomId: string
};

export type ReviewMap = Record<string, Review>;
