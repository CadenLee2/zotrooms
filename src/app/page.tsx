'use client'

import "./page.css";

import MainPage from '../components/MainPage/MainPage';

import { store } from '../store/store';
import { Provider } from 'react-redux';

export default function Home() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}
