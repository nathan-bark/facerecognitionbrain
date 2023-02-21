import React, { useState } from "react";
import "./App.css";
import ParticlesBg from "particles-bg";
import Clarifai from "clarifai";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";

const PAT = "48d7983110e448a2a47f6aa43ff7b988";
const USER_ID = "nathan_bark_4";
const APP_ID = "face-recog-project";
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

function App() {
  let [input, setInput] = useState("");
  let [IMAGE_URL, setIMAGE_URL] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onClick = () => {
    setIMAGE_URL(input)

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
      .catch(error => console.log(error))
  };

  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onChange={onChange} onClick={onClick} />
      <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={55} />
      <FaceRecognition picToDetect={IMAGE_URL} />
    </div>
  );
}

export default App;
