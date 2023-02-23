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

        {boxes.map((box, i) => {
          const { topRow, rightCol, bottomRow, leftCol } = box;
          return (
            <div
              key={i}
              className="bounding-box"
              style={{
                top: topRow,
                left: leftCol,
                right: rightCol,
                bottom: bottomRow,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
