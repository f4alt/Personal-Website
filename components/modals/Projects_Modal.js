import React, { useState, useEffect } from "react";

export default function Index_Modal(props) { 
  const [Fullscreen, setFullscreen] = useState(true);

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
                {/* card 1 */}
                <div className={`${Fullscreen ? "grid-cols-3" : "grid-cols-2"} grid overflow-x-hidden`}>
                    <div class="card grid">
                        <div class="face face1">
                            <div class="content">
                                <img src="imgs/project-cards/marbleamerica.png"/>
                                <h3>marbleamericaonline.com</h3>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <p>Client website
                                HTML/CSS/JavaScript built on top of bigcommerce store
                                </p>
                                <a target="_blank" href="https://www.marbleamericaonline.com">Site</a>
                            </div>
                        </div>
                    </div>
                    {/* card 2 */}
                    <div class="card grid">
                        <div class="face face1">
                            <div class="content">
                                <img src="imgs/project-cards/brlcad.png"/>
                                <h3>BRL-CAD</h3>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                            <p>Full-Time Software Developer for BRL-CAD
                            </p>
                            <a target="_blank" href="https://github.com/BRL-CAD/brlcad">Github</a>
                            <a target="_blank" href="https://brlcad.org">BRLCAD</a>
                            </div>
                        </div>
                    </div>
                    {/* card 3 */}
                    <div class="card grid">
                        <div class="face face1">
                            <div class="content">
                                <img src="imgs/project-cards/allstar.png"/>
                                <h3>Ham Radio via VoIP</h3>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <p>Built Allstar node on a Rasberry pi which allows ham radio
                                operation to anyone in the world over the internet
                                </p>
                                <a target="_blank" href="https://allstarlink.org">Allstar</a>
                            </div>
                        </div>
                    </div>
                    {/* card 4 */}
                    <div class="card grid">
                        <div class="face face1">
                            <div class="content">
                                <img src="imgs/project-cards/allstar.png"/>
                                <h3>mcgregorc.com</h3>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <p>This site - <br/>Node + React.</p>
                                <a target="_blank" href="https://github.com/f4alt/Personal-Website">Github Repo</a>
                            </div>
                        </div>
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