import React from 'react';

import Faux_Window from '../Faux_Window';
import ThemeEnvSelector from '../ThemeEnvSelector';
import ThemeColSelector from '../ThemeColSelector';

export default function Help_Modal(props) {
  return (
    <Faux_Window important={true} title="README.txt" {...props}>
      <div className="modal-content">
        <div className="heading">Welcome To my Site!</div>
        <p>
          Step into a faux computer environment that blurs the lines between the real and the digital, where HTML and CSS shape not just websites, but also my identity.
          As you navigate this pixelated realm, you'll discover the mosaic of my passions, projects, and personality.
          <br />
          Navigation is about what you'd expect - click to open things, and click the 'x' / red button
          in the top to close.
          I've coded lots of the basic interactions you'd expect to see, so please poke, prod and explore!
        </p>
        <div style={{paddingTop: '30px'}}>
          Choose your environment:
        </div>
        <ThemeEnvSelector />
        <div>
          Choose your color scheme:
        </div>
        <ThemeColSelector />
      </div>
    </Faux_Window>
  );
}
