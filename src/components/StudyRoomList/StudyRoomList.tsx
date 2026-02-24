import './StudyRoomList.css';

import StudyRoomCard from '../StudyRoomCard/StudyRoomCard';

import { StudyRoom } from '@/types/types';

export default function StudyRoomList(props: { studyRooms: StudyRoom[], emptyMessage?: string, grid?: true }) {
  const rooms = props.studyRooms;

  return (
    <div className={`study-room-list ${props.grid ? 'grid' : ''}`}>
      {rooms.map((room, i) => <StudyRoomCard key={`room-card-${i}`} studyRoom={room} />)}
      {rooms.length === 0 && <i className="sub">{props.emptyMessage ?? "No rooms found!"}</i>}
    </div>
  );
}
