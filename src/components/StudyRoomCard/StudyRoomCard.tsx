import './StudyRoomCard.css';

import { StudyRoom } from '../../types/types';

export default function StudyRoomCard(props: { studyRoom: StudyRoom }) {
  const room = props.studyRoom;

  return (
    <div className="study-room-card">
      <h3>{room.name}</h3>
      <i className="sub">@ {room.location}</i>
      <div>
        Unrated
      </div>
    </div>
  );
}
