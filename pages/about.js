import { useState } from 'react';
import Terminal from '../components/Terminal';
import Page_Comps from '../components/Page_Comps';
import About_Modal from '../components/modals/About_Modal';
import HelpBtn from '../components/HelpBtn';

export default function About() {
  const ascii_art = 
".__________________________________________________.\n\
||                                                ||\n\
||         o                                      ||\n\
||      /\\O/                          O           ||\n\
||     0  \\\\            |           0-#           ||    ___.\n\
||   _____//____________|____________/_\\______    ||   /    \\\n\
!__________________________________________________!  |      |\n\
|   __ __ __ __ __ __ __ __ __ __  /|\\             |  |      |\n\
|__/_//_//_//_//_//_//_//_//_//_/____________--____|  |  .---|---.\n\
| ______________________________________________   |  |  |   |   |\n\
| [][][][][][][][][][][][][][][__] [_][_] [][][][] |  |  |---'---|\n\
| [_][][][][][][][][][][][][]| |[] [][][] [][][][] |  |  |       |\n\
| [__][][][][][][][][][][][][__|[] [][][] [][][][] |  |  |       |\n\
| [_][][][][][][][][][][][][_]            [][][]|| |  |  |  /|\\  |\n\
|    [_][________________][_]             [__][]LI |  |   \\_____/\n\
|__________________________________________________|  ;\n\
                                                 \\___/\n\
";
  const [showModal, setShowModal] = useState(false);

  Page_Comps.welcome = ascii_art;
  Page_Comps.path = "~/about";
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
      <About_Modal open={showModal} setShowModal={setShowModal}/>
      {/* <Test_Modal open={showTestModal} setShowModal={setShowTestModal}/> */}
    </div>
    <div className="sm-screen">
    <div className={`relative w-auto mx-auto max-w-3xl`}>
          {/*content*/}
          <div className={`rounded-lg relative flex flex-col bg-darkblue text-sm-text`}
               onClick={(e) => e.stopPropagation()}
          >
            {/*header*/}
            <div className="flex items-center justify-between p-2 border-solid border-slate-200 rounded-t">
              <div>
                <button className="button-red"/>
                <button className="button-yellow"/>
                <button className="button-green"/>
              </div>
              <h3 className={`text-xl font-semibold p-0`}>
                README.txt
              </h3>
            </div>
            {/*body*/}
            <div className="">
                  {/* <div className="my-4 text-slate-500 text-lg leading-relaxed"> */}
                  <div className="profile-pic">
                    <img src="imgs/me.jpg"/>
                  </div>
                  <div className={`px-6 py-4`}>
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
    </main>
  );
}