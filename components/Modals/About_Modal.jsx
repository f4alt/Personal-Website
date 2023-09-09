import React, {useState} from 'react';

import Faux_Window from '../Faux_Window';
import Project_Card from '../Project_Card';

import '../../styles/about.css';
import '../../styles/projects.css';

export default function About_Modal(props) {
  const [openTab, setOpenTab] = useState('about');
  const [closedTabs, setClosedTabs] = useState([]);
  const [tabs, setTabs] = useState(['about', 'projects']);

  function handleCloseTab(name) {
    if (tabs.length == 1) {
      // easy case - only one thing to close
      setTabs([]);
      setClosedTabs([...closedTabs, name]);
      setOpenTab('');
      return;
    }

    const updatedTabs = tabs.filter((item) => item !== name);
    setTabs(updatedTabs);
    setClosedTabs([...closedTabs, name]);
    // switch tabs if we closed the currently open one
    // NOTE: setTabs hasn't updated the array yet
    if (name !== openTab) {
      return;
    }

    if (tabs[0] === name) {
      setOpenTab(tabs[1]);
    } else {
      setOpenTab(tabs[0]);
    }
  };

  function handleOpenTab() {
    setTabs([...tabs, closedTabs.pop()]);
    setClosedTabs([...closedTabs]);
  }

  const tabBar = (
    <div className="tab-content">
      {tabs.map((tabName) =>
        <div className={`tab ${openTab === tabName ? 'selected' : ''}`} key={tabName}>
          <h3 onClick={() => setOpenTab(tabName)}>
            {tabName}.me
          </h3>
          <button style={{display: 'flex'}} onClick={() => handleCloseTab(tabName)}>X</button>
        </div>,
      )}
      <div className={`${tabs.length < 2 ? 'add-file-popup' : 'hidden'}`}>
        <button onClick={handleOpenTab}
          className="add-file">+</button>
      </div>
    </div>
  );

  return (
    <Faux_Window tabBar={tabBar} {... props}>
      {openTab === 'about' && (
        <div className="container">
          <div className="header">
            <div className="image">
              <img src="imgs/me.jpg" alt="Me in aggieland" />
            </div>
            <div className="text">
              <h1>Howdy, I'm Christopher.</h1>
              <p>
                    I spend my days crafting software solutions and my
                    free time exploring the world of technology, hitting
                    the tennis court, listening to my favorite tunes,
                    and spending quality time with my furry companions.
              </p>
            </div>
          </div>

          <div className="skills">
            <h1>Technical Skills</h1>
            <div className="skill-bar">
              <div className="skill-name">C / C++ Development</div>
              <div className="skill-bar-container">
                <div className="skill-bar-progress" style={{width: '90%'}}></div>
              </div>
            </div>
            <div className="skill-bar">
              <div className="skill-name">Web Development</div>
              <div className="skill-bar-container">
                <div className="skill-bar-progress" style={{width: '80%'}}></div>
              </div>
            </div>
            <div className="skill-bar">
              <div className="skill-name">Version Control</div>
              <div className="skill-bar-container">
                <div className="skill-bar-progress" style={{width: '87%'}}></div>
              </div>
            </div>
            <div className="skill-bar">
              <div className="skill-name">CI / Testing</div>
              <div className="skill-bar-container">
                <div className="skill-bar-progress" style={{width: '82%'}}></div>
              </div>
            </div>
          </div>
        </div>)}
      {openTab === 'projects' && (
        <div className="card-container">
          <Project_Card
            title="marbleamericaonline.com"
            img="imgs/project-cards/marbleamerica.png"
          >
            Client website
            HTML/CSS/JavaScript built on top of bigcommerce store
            <a target="_blank" rel="noopener noreferrer" href="https://www.marbleamericaonline.com">Client Site</a>
          </Project_Card>
          <Project_Card title="BRL-CAD" img="imgs/project-cards/brlcad.png">
                Full time software developer for BRL-CAD
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/BRL-CAD/brlcad">Github Project</a>
            <a target="_blank" rel="noopener noreferrer" href="https://brlcad.org/">BRLCAD.org</a>
          </Project_Card>
          <Project_Card title="This site" img="imgs/project-cards/this-site.png">
                This website - christophermcgregor.com
            <br />
                Built with node + react
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/f4alt/Personal-Website">Github Project</a>
          </Project_Card>
          <Project_Card title="Ham Radio via VoIP" img="imgs/project-cards/allstar.png">
                Allstar node running on raspberry pi. Radio handle KI5QGI
            <a target="_blank" rel="noopener noreferrer" href="https://www.allstarlink.org">Allstar.org</a>
          </Project_Card>
        </div>
      )}
      {openTab === '' && (
        <div style={{width: '100%', height: '100%'}}>Hey! Why'd you close everything?</div>
      )}
    </Faux_Window>
  );
}
