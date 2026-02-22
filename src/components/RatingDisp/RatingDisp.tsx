"use client"

import './RatingDisp.css';

import { useMemo, useState } from 'react';
import { MdStarOutline, MdStar } from 'react-icons/md';

export function RatingDisp(props: { value?: number }) {
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

function Star(props: { i: number, filled: boolean, hoveredValue: number | null }) {
  const { i, filled, hoveredValue } = props;
  const shouldFill = (hoveredValue !== null) ? (hoveredValue >= i) : filled;
  return shouldFill ? <MdStar className="filled" /> : <MdStarOutline key={i} />
}

export function RatingDispInteractive(props: { value?: number, setValue(i: number): void }) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const stars = useMemo(() => {
    const res = [];
    for (let i = 0; i < 5; i++) {
      res.push(i < (props.value ?? 0));
    }
    return res;
  }, [props.value]);

  const hoverButton = (i: number) => {
    setHoveredValue(i);
  }

  const unhoverButton = (i: number) => {
    setHoveredValue(null);
  }

  return (
    <div className="rating-disp interactive">
      {stars.map((filled, i) => (
        <button
          key={`interactive-${i}`}
          onMouseEnter={() => hoverButton(i)}
          onMouseLeave={() => unhoverButton(i)}
          onClick={() => props.setValue(i + 1)}
        >
          <Star filled={filled} i={i} hoveredValue={hoveredValue} />
        </button>
      ))}
    </div>
  );
}
