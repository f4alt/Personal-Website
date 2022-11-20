import { useState } from 'react';
import Terminal from '../components/Terminal';
import Page_Comps from '../components/Page_Comps';
import Contact_Modal from '../components/modals/Contact';
import HelpBtn from '../components/HelpBtn';

export default function Contact() {
  const [showModal, setShowModal] = useState(false);

  Page_Comps.welcome = "This is the contact page";
  Page_Comps.path = "~/contact";
  Page_Comps.ls = {"contact.txt": ["", ""],
                  };
  Page_Comps.openable = {
                        "contact.txt": setShowModal,
                        };     
  Page_Comps.created = [];

  return (
    <div>
      <HelpBtn opener={setShowModal}/>
      <Terminal page_comps={Page_Comps} />
      <Contact_Modal open={showModal} setShowModal={setShowModal}/>
    </div>
  );
}