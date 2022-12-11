import { useState } from 'react';
import Terminal from '../components/Terminal';
import Page_Comps from '../components/Page_Comps';
import Contact_Modal from '../components/modals/Contact_Modal';
import HelpBtn from '../components/HelpBtn';

export default function Contact() {
  const ascii_art = 
"                      .`.\n\
                    .`~.-:\n\
                  .`- . -`\n\
                .`-  . -`\n\
              .`-   . -`\n\
            .`-    . -`\n\
          .`-     . -`\n\
         `-      . -`\n\
       .`-      . -`\n\
      ;-       . -`\n\
     .-      .  -`\n\
    ;.      . -`\n\
   ;.     . -`\n\
   ::._.-`\n\
   (.-`\n\
   .Y(.\n\
  ((()))\n\
  _)==(_\n\
 | .--. |\n\
 | '--' |\n\
 '------'\n\
";
  const [showModal, setShowModal] = useState(false);

  Page_Comps.welcome = ascii_art;
  Page_Comps.path = "~/contact";
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
      <Contact_Modal open={showModal} setShowModal={setShowModal}/>
    </div>
    <div className="sm:hidden sm-screen">
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
                    <p className={`text-2xl`}>Want to reach out?</p>
                    Contact form coming soon!
                  </div>
                </div>
          </div>
        </div>
    </div>
    </main>
  );
}