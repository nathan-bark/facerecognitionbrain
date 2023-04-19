import React, { useState } from "react";
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



const initialUserState = {
  id: "",
  name: "",
  email: "",
  entries: 0,
  joined: "",
};

function App() {
  let [input, setInput] = useState("");
  let [IMAGE_URL, setIMAGE_URL] = useState("");
  let [boxes, setBoxes] = useState([]);
  let [route, setRoute] = useState("signin");
  let [isSignedIn, setIsSignedIn] = useState(false);
  let [user, setUser] = useState(initialUserState);

  const resetState = () => {
    setUser(initialUserState);
    setInput("");
    setIMAGE_URL("");
    setBoxes([]);
  };

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
    fetch("https://face-recognition-brain-gubr.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result){
        fetch("https://face-recognition-brain-gubr.onrender.com/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
          }),
        })
          .then((res) => res.json())
          .then((count) => {
            setUser({ ...user, entries: count });
          })
          .catch(err => console.log(err))

        displayFaceBox(calculateFaceLocation(result));
      }})

      .catch((error) => console.log(error));
  };

  const onRouteChange = (newRoute) => {
    if (newRoute === "home") {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
      resetState();
    }

    setRoute(newRoute);
  };

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Logo />
      <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={55} />
      {route === "signin" ? (
        <div>
          <SignInForm loadUser={loadUser} onRouteChange={onRouteChange} />
          <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={55} />
        </div>
      ) : route === "register" ? (
        <div>
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />
          <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={55} />
        </div>
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
