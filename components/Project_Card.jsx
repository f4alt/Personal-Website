import React from 'react';

export default function Project_Card(props) {
  return (
    <div className="card">
      <div className="face face1">
        <div className="content">
          <img src={props.img}/>
          <h3>{props.title}</h3>
        </div>
      </div>
      <div className="face face2">
        <div className="content">
          <h3>
            {props.children}
          </h3>
        </div>
      </div>
    </div>
  );
}
