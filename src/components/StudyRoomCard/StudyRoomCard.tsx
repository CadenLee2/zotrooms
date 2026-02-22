import './StudyRoomCard.css';

import { StudyRoom } from '../../types/types';
import { MdStarOutline, MdStar, MdLocationPin } from 'react-icons/md';
import { useMemo } from 'react';

import { useSelectedRoomId } from '../../hooks/hooks';

function RatingDisp(props: { value?: number }) {
  const stars = useMemo(() => {
    const res = [];
    for (let i = 0; i < 5; i++) {
      res.push(i < (props.value ?? 0));
    }
    return res;
  }, [props.value]);

  return (
    <div className={`rating-disp ${props.value ? '' : 'unrated'}`}>
      {stars.map((filled, i) => (
        filled ? <MdStar className="filled" key={i} /> : <MdStarOutline key={i} />
      ))}
    </div>
  );
}

export default function StudyRoomCard(props: { studyRoom: StudyRoom }) {
  const room = props.studyRoom;

  const { setSelectedRoomId } = useSelectedRoomId();

  return (
    <button className="study-room-card" onClick={() => setSelectedRoomId(room.id)}>
      <h3>{room.name}</h3>
      <i className="sub">
        <MdLocationPin />
        {room.location}
      </i>
      <div>
        <RatingDisp value={3} />
      </div>
    </button>
  );
}
