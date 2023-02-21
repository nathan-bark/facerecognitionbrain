import React from "react";

const FaceRecognition = ({ picToDetect }) =>{
    return (
        <div className="centre mt3 mb3" >
            <img src={picToDetect} alt="" width='500px' height='auto' />
        </div>
    )
}

export default FaceRecognition;