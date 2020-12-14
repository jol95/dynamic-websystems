import React from "react";
import "./Home.css";

class Home extends React.Component{
  
  constructor(){
    super();
  }

  render(){
    return (
      <div className="Home">
        <div className="lander">
          <h1>Scratch</h1>
          <p className="text-muted">A simple note taking app</p>
        </div>
      </div>
    );
  }
}

export default Home;