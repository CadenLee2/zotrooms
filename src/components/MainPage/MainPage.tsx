import Header from '../Header/Header';
import StudyRoomList from '../StudyRoomList/StudyRoomList';
import RatingModal from '../RatingModal/RatingModal';

import { StudyRoom } from '../../types/types';

import { useSelectedRoomId } from '../../helpers/hooks';
import { getRated, keywordSearch } from '../../helpers/mockApi';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

import { useState, useEffect } from 'react';

export default function MainPage() {
  const { selectedRoomId } = useSelectedRoomId();

  const [rated, setRated] = useState<StudyRoom[]>([]);

  const search = useAppSelector((state) => state.siteSlice.search);

  const [searchResults, setSearchResults] = useState<StudyRoom[] | null>(null);

  useEffect(() => {
    getRated().then(res => setRated(res));
    if (search) {
      setSearchResults(null);
      keywordSearch(search).then((res) => {
        setSearchResults(res);
      });
    }
  }, [search]);

  return (
    <div className="page">
      <Header />
      <div className="main-content">
        {search ? (
          <>
            <h2>Search Results</h2>
            {searchResults ? <StudyRoomList studyRooms={searchResults} /> : "Loading..."}
          </>
        ) : (
          <>
            <h2>Rated</h2>
            <StudyRoomList studyRooms={rated} />
            <h2>All Rooms</h2>
            <StudyRoomList studyRooms={rated} />
          </>
        )}
      </div>
      {selectedRoomId && <RatingModal />}
    </div>
  )
}
