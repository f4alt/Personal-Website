import { useState } from 'react';
import Terminal from '../components/Terminal';
import Page_Comps from '../components/Page_Comps';
import Projects_Modal from '../components/modals/Projects_Modal';
import HelpBtn from '../components/HelpBtn';

export default function Projects() {
  const [showModal, setShowModal] = useState(false);

  Page_Comps.welcome = "This is the projects page";
  Page_Comps.path = "~/projects";
  Page_Comps.ls = {"projects.txt": ["", ""],
                  };
  Page_Comps.openable = {
                        "projects.txt": setShowModal,
                        };    
  Page_Comps.created = [];              

  return (
    <div>
      <HelpBtn opener={setShowModal}/>
      <Terminal page_comps={Page_Comps} />
      <Projects_Modal open={showModal} setShowModal={setShowModal}/>
    </div>
  );
}