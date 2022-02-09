import React, { Component } from "react";
import Particles from "react-tsparticles";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "222d66483825430fa1f021cfcd3d2432",
});

const particlesOptions = {
  particles: {
    value: 30,
    density: {
      enable: true,
      value_area: 1000,
    },
    move: {
      enable: true,
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    console.log("click");
    app.models
      .predict(
        "45fb9a671625463fa646c3523a3087d5",
        "https://samples.clarifai.com/metro-north.jpg"
      )
      .then(
        function (response) {
          console.log(response);
        },
        function (err) {
          //
        }
      );
  };

  render() {
    return (
      <div className="App">
        <Particles id="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />

        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
