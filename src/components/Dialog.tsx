import { useState } from "react";
import "./Dialog.css";

function Dialog(content: {
  title: string;
  children: React.ReactNode;
  header?: string;
  underHeader?: string;
  purpose?: string;
}) {
  const [open, setOpen] = useState(false);
  const [cont, setCont] = useState(content);
  const object = {
    state: [open, setOpen] as [typeof open, typeof setOpen],
    content: [cont, setCont] as [typeof cont, typeof setCont],
    jsx: open ? (
      <div className={`Dialog scrim`} onClick={() => setOpen(false)}>
        <div
          className="topBar"
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            e.stopPropagation()
          }
        >
          <button onClick={() => setOpen(false)}>close</button>
          <span className="fw hideUsual">{cont.title}</span>
          <div className="pages">{cont.purpose}</div>
        </div>
        <div
          className="box"
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            e.stopPropagation()
          }
        >
          {cont.header ? (
            <h6>
              <i>{cont.header}</i>
            </h6>
          ) : (
            <></>
          )}
          <h1>{cont.title}</h1>
          {cont.underHeader ? <h6>{cont.underHeader}</h6> : <></>}
          {cont.children}
        </div>
      </div>
    ) : (
      <></>
    ),
  };
  return object;
}

export default Dialog;
