import React, { useState, createContext } from 'react';
import Head from 'next/head';
import Terminal from '../components/Terminal'; 
import Page_Comps from '../components/Page_Comps';
import Index_Modal from '../components/modals/Index_Modal';
import HelpBtn from '../components/HelpBtn';
// import Test_Modal from '../components/modals/Test_Modal';

export default function Home(setHelpModal) {
  const ascii_art = 
" __    __    ______   ____    __    ____  _______  ____    ____ \n\
|  |  |  |  /  __  \\  \\   \\  /  \\  /   / |       \\ \\   \\  /   / \n\
|  |__|  | |  |  |  |  \\   \\/    \\/   /  |  .--.  | \\   \\/   /  \n\
|   __   | |  |  |  |   \\            /   |  |  |  |  \\_    _/   \n\
|  |  |  | |  `--'  |    \\    /\\    /    |  '--'  |    |  |     \n\
|__|  |__|  \\______/      \\__/  \\__/     |_______/     |__|  (_ )      I'm Christopher\n\
                                                              |/ ";

  /* Index_Modal handler */
  const [showModal, setShowModal] = useState(false);
  // const [showTestModal, setShowTestModal] = useState(false);

  /* Update Page components for Home */
  Page_Comps.welcome = ascii_art;
  Page_Comps.path = "~";
  Page_Comps.ls = {"about": ["text-dir", ""], 
                   "projects":["text-dir",""], 
                   "contact":["text-dir",""],
                   "README.txt":["",""],
                   "welcome": ["text-exe",""],
                  }
  Page_Comps.openable = {//"test": setShowTestModal,
                        "README.txt": setShowModal,
                        "readme.txt": setShowModal,
                        "README": setShowModal,
                        "readme": setShowModal,
                        };
  Page_Comps.created = [];
                               
  return (
    <div>
      <Head>
        <title>Christopher McGregor</title>
        <meta name="description" content="Christopher McGregor" />
      </Head>
      <main>
        <HelpBtn opener={setShowModal}/>
        <Terminal page_comps={Page_Comps} />
        <Index_Modal open={showModal} setShowModal={setShowModal}/>
        {/* <Test_Modal open={showTestModal} setShowModal={setShowTestModal}/> */}
      </main>
    </div>
  );
}
