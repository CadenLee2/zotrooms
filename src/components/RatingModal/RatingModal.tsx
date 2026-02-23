"use client"

import './RatingModal.css';

import { StudyRoom, Review } from '../../types/types';
import { MdPeople, MdMonitor, MdLocationPin, MdLaunch } from 'react-icons/md';
import { MouseEvent, useState, useRef, useEffect } from 'react';
import Button from '../Button/Button';
import { RatingDispInteractive } from '../RatingDisp/RatingDisp';

import { useSelectedRoomId } from '../../helpers/hooks';
import { getById } from '../../helpers/api';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setIndividualReview } from '../../store/siteSlice';

function ModalContents(props: { room: StudyRoom, handleClose(): void }) {
  const { room, handleClose } = props;

  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const currentReview: Review | undefined = useAppSelector((state) => state.siteSlice.reviews[room.id]);

  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  // TODO: add initial value if they've already reviewed it
  const [rating, setRating] = useState<number | null>(currentReview?.rating ?? null);
  const [comment, setComment] = useState(currentReview?.explanation ?? '');

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    // TODO: loading state, and wait for API
    dispatch(setIndividualReview({ roomId: room.id, review: undefined }));
    setRating(null);
    setComment('');
  }

  const handleConfirm = () => {
    if (!rating) return;
    dispatch(setIndividualReview({ roomId: room.id, review: { rating, explanation: comment } }));

    // TODO: loading state, and wait for API
    handleClose();
  }

  return (
    <>
      <div className="row">
        <h2 tabIndex={-1} autoFocus ref={titleRef}>{room.name}</h2>
        <a title="Open room URL" target="_blank" href={room.url}>
          <MdLaunch />
        </a>
      </div>
      <div className="loc-info">
        <i className="sub">
          <MdLocationPin />
          {room.location}
        </i>
        <span title={`Capacity: ${room.capacity} people`} className="pill"><MdPeople />{room.capacity}</span>
        {room.techEnhanced && <span title="Tech Enhanced" className="pill"><MdMonitor />TECH</span>}
      </div>
      <p>{room.description}</p>
      <p className="sub">Directions: {room.directions}</p>
      <div><hr /></div>
      <h3>{currentReview ? 'Edit' : 'Leave'} your rating!</h3>
      <RatingDispInteractive value={rating ?? undefined} setValue={(i) => setRating(i)} />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Any comments?" />
      <div className="modal-buttons">
        <button onClick={handleClose} className="cancel">Cancel</button>
        {currentReview && <button onClick={handleDelete} className="delete">Clear review</button>}
        <Button onClick={handleConfirm} disabled={!rating}>Confirm</Button>
      </div>
    </>
  );
}

export default function RatingModal() {
  const { selectedRoomId, setSelectedRoomId } = useSelectedRoomId();

  const [room, setRoom] = useState<StudyRoom | undefined>(undefined);

  useEffect(() => {
    if (!selectedRoomId) return;
    getById(selectedRoomId).then(r => setRoom(r));
  }, [selectedRoomId]);

  const handleClose = () => {
    setSelectedRoomId(null);
  }

  const handleInnerClick = (event: MouseEvent) => {
    event.stopPropagation();
  }

  return (
    <div onClick={handleClose} className="backdrop">
      <div onClick={handleInnerClick} className="modal-content">
        {room ? <ModalContents room={room} handleClose={handleClose} /> : <div className="loading">Loading...</div>}
      </div>
    </div>
  );
}
