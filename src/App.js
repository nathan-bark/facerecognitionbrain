import React from "react";
import "./App.css";
import ParticlesBg from "particles-bg";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank'

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />

      <ParticlesBg type="cobweb" bg={true} color='#696462' num={60} />
      
      {/* 
      
      <FaceRecognition /> */}
    </div>
  );
}

export default App;
