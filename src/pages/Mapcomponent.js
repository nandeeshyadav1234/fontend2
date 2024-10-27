// src/components/EmbeddedMap.js
import React from 'react';


const EmbeddedMap = () => {
  return (
    <div>
      <h2>Location Map</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.4088245696757!2d76.6918767248699!3d14.461198436008766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb0ba78e72c993d%3A0x1b29501c5501e489!2sMannekote%2C%20Karnataka%20577543!5e0!3m2!1sen!2sin!4v1730016380802!5m2!1sen!2sin"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default EmbeddedMap;
