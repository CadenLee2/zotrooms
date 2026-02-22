'use client'

import "./page.css";

import Header from '../components/Header/Header';
import StudyRoomList from '../components/StudyRoomList/StudyRoomList';
import RatingModal from '../components/RatingModal/RatingModal';

import { StudyRoom } from '../types/types';

import { useSelectedRoomId } from '../helpers/hooks';
import { getRated } from '../helpers/mockApi';

import { useState, useEffect } from 'react';

import MainPage from '../components/MainPage/MainPage';

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
      <MainPage />
    </Provider>
  );
}
