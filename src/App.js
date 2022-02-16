import React, { Component } from 'react'
import Particles from 'react-tsparticles'
import Clarifai from 'clarifai'
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import './App.css'

// console.log(Clarifai)

const app = new Clarifai.App({
  apiKey: '222d66483825430fa1f021cfcd3d2432',
})

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
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data, i) => {
    let clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    let image = document.getElementById('inputimage')
    let width = Number(image.width)
    let height = Number(image.height)
    return {
      leftcol: clarifaiFace.left_col * width,
      toprow: clarifaiFace.top_row * height,
      rightcol: width - clarifaiFace.right_col * width,
      bottomrow: height - clarifaiFace.bottom_row * height,
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
    })
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch((err) => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state
    return (
      <div className="App">
        <Particles id="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    )
  }
}

export default App
