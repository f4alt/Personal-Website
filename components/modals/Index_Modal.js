import React, { useState, useEffect } from "react";

export default function Index_Modal(props) { 
  useEffect(() => {
    const handleEsc = (event) => {
       if (event.keyCode === 27) {
        props.setShowModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  const [Fullscreen, setFullscreen] = useState(true);
  
  return (
        <>
      {props.open ? (
        <>
          <div
            className="center flex items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => props.setShowModal(false)}
         >
            <div className={`${Fullscreen ? "fullscreen" : ""} relative w-auto mx-auto max-w-3xl`}>
              {/*content*/}
              <div className={`${Fullscreen ? "fullscreen" : ""} rounded-lg relative flex flex-col bg-lightblue`}
                   onClick={(e) => e.stopPropagation()}
              >
                {/*header*/}
                <div className="flex items-center justify-between p-2 border-solid border-slate-200 rounded-t">
                  <div>
                    <button onClick={() => props.setShowModal(false)} className="button-red"/>
                    <button onClick={() => props.setShowModal(false)} className="button-yellow"/>
                    <button onClick={() => setFullscreen(!Fullscreen)}className="button-green"/>
                  </div>
                  <h3 className={`${Fullscreen ? "fullscreen-text" : ""} text-xl font-semibold p-0`}>
                    README.txt
                  </h3>
                </div>
                {/*body*/}
                <div className="grid">
                  {/* <div className="my-4 text-slate-500 text-lg leading-relaxed"> */}
                  <div className={`${Fullscreen ? "fullscreen-text" : ""} px-6 py-4`}>
                    <p className={`${Fullscreen ? "fullscreen-text" : ""} text-2xl`}>What's this site all about?</p>
                    <br/>This website sets out to create a faux computer environment centered around a terminal. 
                    If you don't use a terminal or have no idea what a terminal is, don't worry! 
                    The 'help' command is a good place to start. 
                    Or, if you just don't want to deal with it, click the nav bar at the top and use these 
                    yellow help buttons - it'll get you around (mostly) the same. 
                    I've coded in lots of the basic interactions you'd expect to see, so feel free to 
                    explore the functionality! 
                    Start by clicking the red or yellow button in the top left
                    corner of this window to get back to the main screen. Then, make sure to click inside the terminal
                    and have a flashing cursor. 
                    Enjoy!
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}