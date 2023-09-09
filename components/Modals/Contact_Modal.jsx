import React from 'react';

import Faux_Window from '../Faux_Window';

import '../../styles/contact.css';

export default function Contact_Modal(props) {
  return (
    <Faux_Window title="CONTACT.txt" {... props}>
      <div className="contact-layout">
        <div className="heading">Want to reach out?</div>
        <p>
          Contact form coming soon! In the meantime, enjoy this picture of a dog.
        </p>
        <br />
        <img src="imgs/todd-mittens-TayEXvWChqM-unsplash.jpg"/>
      </div>
    </Faux_Window>
  );
}
