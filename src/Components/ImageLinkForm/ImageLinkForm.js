import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = () => {
  return (
    <div>
      <p className="f4 tc mt5 ">
        Enter a link to a picture and the Brain will detect the faces!
      </p>
      <div className="centre">
        <div className="pa4 shadow-5 br4 form">
          <input className="w-70 f4 pa2" type="text" />
          <button className="w-30 pa2 f4 grow pointer bg-gold dib">
            Detect!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
