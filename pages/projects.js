import { useState } from 'react';
import Terminal from '../components/Terminal';
import Page_Comps from '../components/Page_Comps';
import Projects_Modal from '../components/modals/Projects_Modal';
import HelpBtn from '../components/HelpBtn';

export default function Projects() {
  const ascii_art = 
"                                                                 O--,---,--O\n\
                                          ._O_.     O--=-O-=--O      \\ O /\n\
    _._                      ,_O_,     O--<-+->--O      '-'          - -\n\
   / O  \\        ,-O-,     O--(---)--O       X            v            -\n\
    \\| |/     O--=---=--O      >'>          /  \\          / )          /  \\\n\
O--+=-=+--O      2\"2          - -         -   -        ~  z         =   =\n\
";
  const [showModal, setShowModal] = useState(false);

  Page_Comps.welcome = ascii_art;
  Page_Comps.path = "~/projects";
  Page_Comps.ls = {"README.txt": ["", ""],
                   "welcome": ["text-exe", ""],
                  };
  Page_Comps.openable = {"README.txt": setShowModal,
                         "readme.txt": setShowModal,
                         "README": setShowModal,
                         "readme": setShowModal,
                        };   
  Page_Comps.created = [];              

  return (
    <main>
    <div className="hidden sm:block">
      <HelpBtn opener={setShowModal}/>
      <Terminal page_comps={Page_Comps} />
      <Projects_Modal open={showModal} setShowModal={setShowModal}/>
    </div>
    <div
        class="flex overflow-x-scroll pb-10 pt-10 hide-scroll-bar"
      >
        <div
          class="flex flex-nowrap"
        >
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
    </main>
  );
}