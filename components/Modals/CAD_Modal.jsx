import '../../styles/cad.css';

import React, {useState, useRef} from 'react';
import '@google/model-viewer';

import Faux_Window from '../Faux_Window';

export default function CAD_Modal(props) {
  const DEFAULT_SELECTED = 'Buggy.glb';
  const [activeId, setActiveId] = useState(DEFAULT_SELECTED);

  function Slide(props) {
    const name = props.name;
    const strip_extension = name.substring(0, name.lastIndexOf('.')) || name;

    const style = {
      backgroundImage: 'url(imgs/cad_tiles/' + strip_extension + '.png)',
    };

    return (
      <button id={name}
        className={`slide ${activeId === name ? 'selected' : ''}`}
        onClick={(e) => {
          setActiveId(e.target.id);
        }}
        style={style}
      >
        {props.children}
      </button>
    );
  };

  return (
    <Faux_Window title="3D Models" {... props}>
      <CAD_Model name={activeId}/>

      <Draggable>
        <Slide name="Buggy.glb">Lego Rover</Slide>
        <Slide name="Jeep.glb">Jeep</Slide>
        <Slide name="Cessna-172.glb">Cessna 172</Slide>
        <Slide name="Perseverance.glb">Perseverance</Slide>
      </Draggable>
    </Faux_Window>
  );
};

function CAD_Model({name}) {
  const strip_extension = name.substring(0, name.lastIndexOf('.')) || name;

  return (
    <model-viewer
      id="viewer"
      src={`models/${name}`}
      ios-src=""
      alt={`A ${strip_extension} 3D Model`}
      shadow-intensity="1"
      camera-controls
    ></model-viewer>
  );
};

const Draggable = ({children}) => {
  const ourRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mouseCoords = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const handleDragStart = (e) => {
    if (!ourRef.current) return;

    const slider = ourRef.current;
    const startX = e.pageX - slider.offsetLeft;
    const startY = e.pageY - slider.offsetTop;
    const scrollLeft = slider.scrollLeft;
    const scrollTop = slider.scrollTop;
    mouseCoords.current = {startX, startY, scrollLeft, scrollTop};
    setIsMouseDown(true);
  };

  const handleDrag = (e) => {
    const WALK_STEP = 1.5;
    if (!isMouseDown || ! ourRef.current) return;
    e.preventDefault();
    const slider = ourRef.current;
    const x = e.pageX - slider.offsetLeft;
    const y = e.pageY - slider.offsetTop;
    const walkX = (x - mouseCoords.current.startX) * WALK_STEP;
    const walkY = (y - mouseCoords.current.startY) * WALK_STEP;
    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    slider.scrollTop = mouseCoords.current.scrollTop - walkY;
  };

  return (
    <div ref={ourRef}
      onMouseDown={handleDragStart}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseMove={handleDrag}
      className="slider">
      {children}
    </div>
  );
};
