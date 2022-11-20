import React, { useState } from "react";

export default function About_Modal(props) { 
  const [Fullscreen, setFullscreen] = useState(false);
  return (
        <>
      {props.open ? (
        <>
          <div
            className="center flex items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className={`${Fullscreen ? "" : "fullscreen"} relative w-auto mx-auto max-w-3xl`}>
              {/*content*/}
              <div className={`${Fullscreen ? "" : "fullscreen"} rounded-lg relative flex flex-col bg-background`}>
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
                    tech fanatic from Corpus Christi, Texas. Currently, I am a full time Senior 
                    Computer Science major, Cyber Security and Embedded Systems Integration minor 
                    at Texas A&M University College Station but I'm still not sure what I want to be 
                    <em> when I grow up</em> yet. My hobbies span from hardware and systems engineering, 
                    to software and web development and .. everything in between! 
                    <br/>Keep scrolling to see some of my skills and recent projects. Thanks for 
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