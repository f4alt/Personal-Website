import React, { useState, useEffect } from "react";

export default function About_Modal(props) { 
  const [Fullscreen, setFullscreen] = useState(false);
  
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

  return (
        <>
      {props.open ? (
        <>
          <div
            className="center flex items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => props.setShowModal(false)}
          >
            <div className={`${Fullscreen ? "" : "fullscreen"} relative w-auto mx-auto max-w-3xl`}>
              {/*content*/}
              <div className={`${Fullscreen ? "" : "fullscreen"} rounded-lg relative flex flex-col bg-lightblue`}
                   onClick={(e) => e.stopPropagation()}
              >
                {/*header*/}
                <div className="flex items-center justify-between p-2 border-solid border-slate-200 rounded-t">
                  <div>
                    <button onClick={() => props.setShowModal(false)} className="button-red"/>
                    <button onClick={() => props.setShowModal(false)} className="button-yellow"/>
                    <button onClick={() => setFullscreen(!Fullscreen)}className="button-green"/>
                  </div>
                  <h3 className={`${Fullscreen ? "" : "fullscreen-text"} text-xl font-semibold p-0`}>
                    README.txt
                  </h3>
                </div>
                {/*body*/}
                <div className="grid grid-cols-2">
                  {/* <div className="my-4 text-slate-500 text-lg leading-relaxed"> */}
                  <div className="profile-pic">
                    <img src="imgs/me.jpg"/>
                  </div>
                  <div className={`${Fullscreen ? "" : "fullscreen-text"} px-6 py-4`}>
                    I'm <span class="name-emphasis">Christopher</span>, a dog loving, piano playing, 
                    tech fan from Corpus Christi, Texas. Currently, I am a full time Software Developer.
                    My interests span from hardware and systems engineering, 
                    to software, web development, and .. everything in between! 
                    <br/>Head over to 'Projects' to see some of my skills and recent projects. Thanks for 
                    checking out my website!
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