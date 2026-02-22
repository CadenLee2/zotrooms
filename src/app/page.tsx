'use client'

import "./page.css";

import Header from '../components/Header/Header';
import StudyRoomList from '../components/StudyRoomList/StudyRoomList';
import RatingModal from '../components/RatingModal/RatingModal';

import { StudyRoom } from '../types/types';

import { useSelectedRoomId } from '../helpers/hooks';
import { getRated } from '../helpers/mockApi';

import { useState, useEffect } from 'react';

import { store } from '../store/store';
import { Provider } from 'react-redux';

export default function Home() {
  const { selectedRoomId } = useSelectedRoomId();

  const [rated, setRated] = useState<StudyRoom[]>([]);

  useEffect(() => {
    getRated().then(res => setRated(res));
  });

  return (
    <Provider store={store}>
      <div className={`page`}>
        <Header />
        <div className="main-content">
          <h2>Rated</h2>
          <StudyRoomList studyRooms={rated} />
          <h2>All Rooms</h2>
          <StudyRoomList studyRooms={rated} />
        </div>
        {selectedRoomId && <RatingModal />}
      </div>
    </Provider>
  );
}
