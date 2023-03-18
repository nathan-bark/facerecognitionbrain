import React, {useState } from "react";
import "./App.css";
import ParticlesBg from "particles-bg";
// import Clarifai from "clarifai";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import SignInForm from "./Components/SignInForm/SignInForm";
import Register from "./Components/Register/Register";

const PAT = "48d7983110e448a2a47f6aa43ff7b988";
const USER_ID = "nathan_bark_4";
const APP_ID = "face-recog-project";
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

function App() {
  let [input, setInput] = useState("");
  let [IMAGE_URL, setIMAGE_URL] = useState("");
  let [boxes, setBoxes] = useState([]);
  let [route, setRoute] = useState("signin");
  let [isSignedIn, setIsSignedIn] = useState(false);
  let [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map(
      (region) => region.region_info.bounding_box
    );
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFace.map((face) => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });
  };

  const displayFaceBox = (box) => {
    setBoxes(box);
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onClick = () => {
    setIMAGE_URL(input);

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

    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(res => res.json())
        .then(count => {
          setUser({...user, entries: count })
        })


        displayFaceBox(calculateFaceLocation(result));
      })

      .catch((error) => console.log(error));
  };

  const onRouteChange = (newRoute) => {
    if (newRoute === "home") {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }

    setRoute(newRoute);
  };

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Logo />
      {route === "signin" ? (
        <SignInForm 
        loadUser={loadUser}
        onRouteChange={onRouteChange} />
      ) : route === "register" ? (
        <Register 
        loadUser={loadUser}
        onRouteChange={onRouteChange} />
      ) : (
        <div>
          <Rank userName={user.name} userEntries={user.entries} />
          <ImageLinkForm onChange={onChange} onClick={onClick} />
          <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={55} />
          <FaceRecognition picToDetect={IMAGE_URL} boxes={boxes} />
        </div>
      )}
    </div>
  );
}

export default App;
