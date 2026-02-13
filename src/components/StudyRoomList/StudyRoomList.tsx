import './StudyRoomList.css';

import StudyRoomCard from '../StudyRoomCard/StudyRoomCard';

import { StudyRoom } from '../../types/types';

export default function StudyRoomList(props: { studyRooms: StudyRoom[] }) {
  const rooms = props.studyRooms;

  return (
    <div className="study-room-list">
      {rooms.map((room, i) => <StudyRoomCard key={`room-card-${i}`} studyRoom={room} />)}
    </div>
  );
}
