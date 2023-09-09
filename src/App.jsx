import '../styles/globals.css';
import '../styles/colorThemes.css';
import '../styles/environments/mac.css';
import '../styles/environments/windows.css';
import '../styles/environments/mobile.css';

import React, {useState, useCallback} from 'react';
import Particles from 'react-tsparticles';
import {loadSlim} from 'tsparticles-slim';

import { useThemeEnv, useThemeCol } from '../components/ThemeContext';
import Nav from '../components/Nav';
import Help_Modal from '../components/Modals/Help_Modal';
import About_Modal from '../components/Modals/About_Modal';
import Contact_Modal from '../components/Modals/Contact_Modal';
import CAD_Modal from '../components/Modals/CAD_Modal';
import Terminal_Modal from '../components/Modals/Terminal_Modal';
import Editor_Modal from '../components/Modals/Editor_Modal';

export default function App() {
  const {env, toggleEnv} = useThemeEnv();
  const [showHelp, setShowHelp] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showCAD, setShowCAD] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  function closeAll() {
    setShowAbout(false);
    setShowHelp(false);
    setShowContact(false);
    setShowTerminal(false);
    setShowCAD(false);
    setShowEditor(false);
  }

  function handleClick(e, show, setShow) {
    const curr = show;
    closeAll();
    setShow(!curr);
    e.stopPropagation();
  }

  return (
    <div className={env}>
      <Nav showHelp={showHelp} setShowHelp={setShowHelp} closeAll={closeAll}/>
      <main>
        {/* load modals */}
        <Help_Modal open={showHelp} setOpen={setShowHelp}/>
        <About_Modal open={showAbout} setOpen={setShowAbout} />
        <Contact_Modal open={showContact} setOpen={setShowContact} />
        <CAD_Modal open={showCAD} setOpen={setShowCAD} />
        <Terminal_Modal open={showTerminal} setOpen={setShowTerminal} editorOpener={setShowEditor}/>
        <Editor_Modal open={showEditor} setOpen={setShowEditor}/>

        {/* particle background */}
        <_Particles />

        {/* dock */}
        <div className="dock" onClick={() => {
          closeAll();
        }}>
          <div className="dock-left">
            <button onClick={(e) => {
              handleClick(e, showAbout, setShowAbout);
            }}
            className="hover-button idle-motion"
            data-name="About Me">
              <img src="/imgs/icons/firefox-logo.png"></img>
            </button>
            <button onClick={(e) => {
              handleClick(e, showContact, setShowContact);
            }}
            className="hover-button idle-motion"
            data-name="Contact Me">
              <img src="/imgs/icons/mail.png"></img>
            </button>
          </div>
          <div className="dock-right">
            <button onClick={(e) => {
              handleClick(e, showEditor, setShowEditor);
            }}
            className="hover-button"
            data-name="Code Editor">
              <img src="/imgs/icons/notepad.png"></img>
            </button>
            <button onClick={(e) => {
              handleClick(e, showTerminal, setShowTerminal);
            }}
            className="hover-button"
            data-name="Terminal">
              <img src="/imgs/icons/terminal.png"></img>
            </button>
            <button onClick={(e) => {
              handleClick(e, showCAD, setShowCAD);
            }}
            className="hover-button"
            data-name="CAD Viewer">
              <img src="/imgs/icons/cad.png"></img>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const _Particles = () => {
  const {color, setColor, colorOptions} = useThemeCol();
  const BACKGROUND_COLOR = color.primary;
  const PARTICLE_COLOR = '#ffffff';
  const LINK_COLOR = '#97b3bf';

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      options={{
        fpsLimit: 60,
        particles: {
          color: {
            value: PARTICLE_COLOR,
          },
          links: {
            color: LINK_COLOR,
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
            blink: true,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 100,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: {min: 1, max: 5},
          },
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'repulse',
            },
            onHover: {
              enable: true,
              mode: 'bubble',
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 200,
              duration: 0.4,
              factor: 0.25,
            },
            bubble: {
              distance: 150,
              duration: 2,
              mix: true,
              opacity: 8,
              size: 10,

            },
          },
        },
        background: {
          color: BACKGROUND_COLOR,
        },
        fullScreen: {
          zIndex: -1,
        },
        detectRetina: true,
      }}
      init={particlesInit}
    />
  );
};
