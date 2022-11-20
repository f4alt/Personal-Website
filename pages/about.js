import { useState } from 'react';
import Terminal from '../components/Terminal';
import Page_Comps from '../components/Page_Comps';
import About_Modal from '../components/modals/About_Modal';
import HelpBtn from '../components/HelpBtn';

export default function About() {
  const [showModal, setShowModal] = useState(false);

  Page_Comps.welcome = "This is the about page";
  Page_Comps.path = "~/about";
  Page_Comps.ls = {"ABOUT.txt": ["", ""],
                  };
  Page_Comps.openable = {
                        "ABOUT.txt": setShowModal,
                        "about.txt": setShowModal,
                        "ABOUT": setShowModal,
                        "about": setShowModal,
                        };   
  Page_Comps.created = [];                                     

  return (
    <div>
      <HelpBtn opener={setShowModal}/>
      <Terminal page_comps={Page_Comps} />
      <About_Modal open={showModal} setShowModal={setShowModal}/>
      {/* <Test_Modal open={showTestModal} setShowModal={setShowTestModal}/> */}
    </div>
  );
}