import "./page.css";

import Header from '../components/Header/Header';
import Button from '../components/Button/Button';

export default function Home() {
  return (
    <div className="page">
      <Header />
      <Button>Start</Button>
      <h1 className="red">Test</h1>
      <a>aasdf</a>
    </div>
  );
}
