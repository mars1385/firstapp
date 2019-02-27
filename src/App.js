import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';




const particlesOption ={
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  userInput : '',
  imageUrl : '',
  boxData : {},
  route : 'signin',
  isSignIn : false,
  user : {
    id : '',
    name : '',
    email : '',
    entries : 0,
    joined : ''
  }
}
class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }
  loadUser = (data) =>{
    this.setState({
      user : {
        id : data.id,
        name : data.name,
        email : data.email,
        entries : data.entries,
        joined : data.joined
      }
    });
  }

  calculateFaceLocation = (data) =>{
    const clarifaiData =  data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector('#inputimage');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    
    return {
      leftCol : clarifaiData.left_col * imageWidth,
      topRow : clarifaiData.top_row * imageHeight,
      rightCol : imageWidth -  (clarifaiData.right_col * imageWidth),
      bottomRow : imageHeight - (clarifaiData.bottom_row * imageHeight) 
    }
  }

  dispalyFaceBox = (box) => {
    this.setState({boxData : box});
  }

  onInputChange = (event) => {
    this.setState({userInput: event.target.value});
  }

  onButtonSubmit =() =>{
    
    this.setState({imageUrl : this.state.userInput});
  
    fetch('http://localhost:3000/imageurl' , {
        method : 'post',
        headers : {'Content-type': 'application/json'},
        body : JSON.stringify({
          userInput :this.state.userInput
        })
    })
    .then (response => response.json())
    .then(response => {
      if (response){
        fetch('http://localhost:3000/image' , {
          method : 'put',
            headers : {'Content-type': 'application/json'},
            body : JSON.stringify({
                id :this.state.user.id
            })
        }).then (response => response.json())
        .then (count => {
          this.setState(Object.assign(this.state.user ,{entries : count}));
        })
        .catch(console.log);
      }
      this.dispalyFaceBox( this.calculateFaceLocation(response))
    })
    .catch(error => console.log(error)); 

  }

  onRouteChange = (Route) => {
    if (Route === 'signin') {
      this.setState(initialState);
    } else if(Route === 'Home'){
      this.setState({isSignIn : true});
    }
    this.setState({route : Route});
  }

  render() {
    const {isSignIn , imageUrl , route , boxData , user} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
            params={particlesOption} />
        <Navigation onRouteChange = {this.onRouteChange } isSignIn= {isSignIn}/>
        {
          route === 'Home'
          ? 
            <div>
              <Logo />
              <Rank name = {user.name} entries = {user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition faceBorder={boxData} imageUrl={imageUrl}/>
            </div>
          :(route === 'signin'
            ?<Signin onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
            :<Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
          )       
        }   
      </div>
    );
  }
}

export default App;
