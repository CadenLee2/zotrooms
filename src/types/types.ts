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
