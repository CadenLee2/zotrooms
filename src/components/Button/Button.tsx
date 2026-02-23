import "./Button.css";

import { ReactNode } from 'react';

export default function Button(props: { children: ReactNode, disabled: boolean, onClick(): void }) {
  return (
    <button onClick={props.onClick} disabled={props.disabled} className="button">
      {props.children}
    </button>
  );
}
