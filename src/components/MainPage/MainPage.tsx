import Header from "../Header/Header";
import StudyRoomList from "../StudyRoomList/StudyRoomList";
import RatingModal from "../RatingModal/RatingModal";

import { StudyRoom } from "@/types/types";

import { useSelectedRoomId } from "@/helpers/hooks";
import { getRated, keywordSearch, getReviews, getByLocation } from "@/helpers/api";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setReviews, setSearch } from "@/store/siteSlice";
import { MdSearch } from "react-icons/md";

import { useState, useEffect } from "react";

const LOCATIONS = [
    "Gateway Study Center",
    "Science Library",
    "Multimedia Resources Center",
    "Langson Library"
];

function BrowseLocation(props: { location: string }) {
  const { location } = props;

  const [rooms, setRooms] = useState<StudyRoom[] | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getByLocation(location, 0, 20).then((res) => {
      setRooms(res);
    });
  }, [location, setRooms]);

  return (
    <>
      <div className="location-title">
        <h2>{location}</h2>
        <button onClick={() => dispatch(setSearch({ newSearch: location }))}>See more... <MdSearch /></button>
      </div>
      {rooms ? <StudyRoomList studyRooms={rooms} /> : "Loading..."}
    </>
  );
}

function BrowseLocations() {
  return (
    <>
      {LOCATIONS.map((loc) => (
        <BrowseLocation key={loc} location={loc} />
      ))}
    </>
  );
}

export default function MainPage() {
  const { selectedRoomId } = useSelectedRoomId();

  const [rated, setRated] = useState<StudyRoom[]>([]);

  const search = useAppSelector((state) => state.siteSlice.search);
  const reviews = useAppSelector((state) => state.siteSlice.reviews);

  const [searchResults, setSearchResults] = useState<StudyRoom[] | null>(null);
  const [searchResultsFor, setSearchResultsFor] = useState("");

  useEffect(() => {
    if (search) {
      keywordSearch(search).then((res) => {
        setSearchResults(res);
        setSearchResultsFor(search);
      });
    } else {
      // TODO: this causes a race if we update local state before updating api. Wait for response in review modal first
      getRated().then(res => setRated(res));
    }
  }, [search, reviews, setSearchResults]);

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
            <h2>Results for <i>{search}</i></h2>
            {(searchResults && finishedLoadingSearch) ? <StudyRoomList grid studyRooms={searchResults} /> : "Loading..."}
          </>
        ) : (
          <>
            <h2>Rated</h2>
            <StudyRoomList studyRooms={rated} emptyMessage="You haven't rated any rooms yet!" />
            <BrowseLocations />
          </>
        )}
      </div>
      <div className="attribution">
        Built for <a target="_blank" href="https://icssc.club/">ICSSC</a>&apos;s IrvineHacks 2026 workshop{" "}
        • <a target="_blank" href="https://github.com/CadenLee2/zotrooms">Source</a>{" "}
        • Data from <a target="_blank" href="https://icssc.link/about-anteaterapi">Anteater API</a>
      </div>
      {selectedRoomId && <RatingModal />}
    </div>
  )
}
