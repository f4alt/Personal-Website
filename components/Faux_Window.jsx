import React, {useState, useEffect, useRef} from 'react';

export default function Faux_Window(props) {
  const timeoutRef = useRef(null);
  const [hide, setHide] = useState(!props.open);
  const [fullscreen, setFullscreen] = useState(true);
  const [minimize, setMinimize] = useState(false);

  useEffect(() => {
    /* need to have delay for minimize animation to run before the content gets removed from dom */
    if (props.open) {
      props.setOpen(true);
      setHide(false);
      clearTimeout(timeoutRef.current);
    } else {
      props.setOpen(false);
      timeoutRef.current = setTimeout(() => setHide(true), minimize && (props.delay || 1000));
      setMinimize(false);
    }
  }, [props.open]);

  /* unmount cleanup */
  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <>
      {!hide ? (
        <>
          <div
            className={`close-listener ${props.open ? '' : 'minimize-effect'}`}
            onClick={() => props.setOpen(false)}
          >
            <div
              className={`faux-window ${fullscreen ? '' : 'fullscreen'}`}
              style={props?.important ? {
                zIndex: 3,
              } : {}}
              onClick={(e) => {
                e.stopPropagation(); props.onClick == null ? null : props.onClick();
              }}
            >
              {/* content */}

              {/* header */}
              <div className="faux-window-header">
                <div className="faux-window-buttons">
                  <button onClick={() => props.setOpen(false)} className="red-button"/>
                  <button onClick={() => {
                    setMinimize(true); props.setOpen(false);
                  }} className="yellow-button"/>
                  <button onClick={() => setFullscreen(!fullscreen)}className="green-button"/>
                </div>
                {/* NOTE: prioritize tabBar if supplied, otherwise just use the title */}
                {props?.tabBar ?
                      props.tabBar :
                      <div className="tab-content single-mac-tab">
                        <div className="tab selected">
                          <h3>{props.title}</h3>
                          <button onClick={() => props.setOpen(false)}>X</button>
                        </div>
                      </div>
                }
              </div>

              {/* body */}
              <div className="faux-window-body">
                {props.children}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
