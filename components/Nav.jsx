import '../styles/navbar.css';
import 'react-datepicker/dist/react-datepicker.css'; // react-datepicker default css

import React from 'react';
import {useState} from 'react';
import DatePicker from 'react-datepicker';

import Clock from './Clock';

export default function Nav(props) {
  const [showLinks, setShowLinks] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  function closeAll() {
    setShowCalendar(false);
    setShowLinks(false);
  }

  return (
    <div className="close-listener"
      onClick={() => {
        closeAll();
      }}
      style={showLinks || showCalendar ? {
        // boost z index so nav popups will always be on topmost layer
        zIndex: 4,
        backgroundColor: 'transparent',
      } : {}}>
      <nav>
        <div id="nav">
          <div>
            <button onClick={(e) => {
              setShowLinks(!showLinks); e.stopPropagation();
            }}>
                                CJM
            </button>
            <button
              onClick={(e) => {
                props.setShowHelp(!props.showHelp);
              }}>
                                Help
            </button>
          </div>
          <div>
            <button style={{padding: '8px'}}>
              <img src="imgs/icons/battery.png"/>
            </button>
            <button style={{padding: '8px'}}>
              <img src="imgs/icons/wifi.png"/>
            </button>
            <button onClick={(e) => {
              setShowCalendar(!showCalendar); e.stopPropagation();
            }}>
              <Clock/>
            </button>
          </div>
        </div>


        {/* links opener */}
        <div
          className={`nav-links ${showLinks ? '' : 'hidden'}`}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <a target="_blank" href="https://www.linkedin.com/in/cjmcgregor/" rel="noreferrer">linked-in</a>
          <a target="_blank" href="https://github.com/f4alt" rel="noreferrer">github</a>
        </div>

        {/* calendar opener */}
        <div
          className={`${showCalendar ? '' : 'hidden'}`}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <DatePicker calendarClassName="calendar" inline/>
        </div>
      </nav>
    </div>
  );
}
