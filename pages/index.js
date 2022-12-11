import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Terminal from '../components/Terminal'; 
import Page_Comps from '../components/Page_Comps';
import Index_Modal from '../components/modals/Index_Modal';
import HelpBtn from '../components/HelpBtn';
// import Test_Modal from '../components/modals/Test_Modal';

export default function Home() {
  const router = useRouter();
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

  useEffect(() => {
    // Prefetch the routes
    router.prefetch('/about');
    router.prefetch('/contact');
    router.prefetch('/projects');
  }, [])
                               
  return (
    <div>
      <Head>
        <title>Christopher McGregor</title>
        <meta name="description" content="Christopher McGregor" />
      </Head>
      <main>
        <div className="hidden sm:block">
        <HelpBtn opener={setShowModal}/>
        <Terminal page_comps={Page_Comps} />
        <Index_Modal open={showModal} setShowModal={setShowModal}/>
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
                <div className="grid">
                  {/* <div className="my-4 text-slate-500 text-lg leading-relaxed"> */}
                  <div className={`px-6 py-4`}>
                    <p className={`text-2xl`}>What's this site all about?</p>
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
      </main>
    </div>
  );
}
