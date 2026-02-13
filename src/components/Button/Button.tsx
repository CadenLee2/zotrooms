import "./Button.css";

import { ReactNode } from 'react';

export default function Button(props: { children: ReactNode }) {
  return (
    <button className="button">
      {props.children}
    </button>
  );
}
