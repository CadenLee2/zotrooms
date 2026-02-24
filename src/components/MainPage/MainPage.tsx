import Header from '../Header/Header';
import StudyRoomList from '../StudyRoomList/StudyRoomList';
import RatingModal from '../RatingModal/RatingModal';

import { StudyRoom } from '../../types/types';

import { useSelectedRoomId } from '../../helpers/hooks';
import { getRated, keywordSearch, getReviews, getAllRooms } from '../../helpers/api';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setReviews } from '../../store/siteSlice';

import { useState, useEffect } from 'react';

export default function MainPage() {
  const { selectedRoomId } = useSelectedRoomId();

  const [rated, setRated] = useState<StudyRoom[]>([]);
  const [allRooms, setAllRooms] = useState<StudyRoom[]>([]);

  const search = useAppSelector((state) => state.siteSlice.search);

  const [searchResults, setSearchResults] = useState<StudyRoom[] | null>(null);
  const [searchResultsFor, setSearchResultsFor] = useState('');

  useEffect(() => {
    getRated().then(res => setRated(res));
    getAllRooms().then(res => setAllRooms(res));
    if (search) {
      keywordSearch(search).then((res) => {
        setSearchResults(res);
        setSearchResultsFor(search);
      });
    }
  }, [search, setSearchResults]);

  const finishedLoadingSearch = searchResultsFor === search;

  const dispatch = useAppDispatch();

  useEffect(() => {
    getReviews().then(res => dispatch(setReviews({ reviewMap: res })));
  }, [dispatch]);

  return (
    <div className="page">
      <Header />
      <div className="main-content">
        {search ? (
          <>
            <h2>Search Results</h2>
            {(searchResults && finishedLoadingSearch) ? <StudyRoomList studyRooms={searchResults} /> : "Loading..."}
          </>
        ) : (
          <>
            <h2>Rated</h2>
            <StudyRoomList studyRooms={rated} emptyMessage="You haven't rated any rooms yet!" />
            <h2>All Rooms</h2>
            <StudyRoomList studyRooms={allRooms} />
          </>
        )}
      </div>
      <div className="attribution">
        Built for <a href="https://icssc.club/">ICSSC</a>&apos;s IrvineHacks 2026 workshop{' '}
        • <a href="https://github.com/CadenLee2/zotrooms">Source</a>{' '}
        • Data from <a href="https://docs.icssc.club/docs/about/anteaterapi">Anteater API</a>
      </div>
      {selectedRoomId && <RatingModal />}
    </div>
  )
}
