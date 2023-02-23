import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ picToDetect, boxes }) => {
  return (
    <div className="centre ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={picToDetect}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: boxes.topRow,
            left: boxes.leftCol,
            right: boxes.rightCol,
            bottom: boxes.bottomRow,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
