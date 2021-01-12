import React from "react";
import "./Home.css";

class Home extends React.Component{

//  constructor(props){
//    super(props);
//  }

  render(){
    return (
      <div className="Home">
        <div className="lander">
          <h1>El Kontrollpanelen</h1>
          <p className="text-muted">Här håller man koll på sin el konsumption :)</p>
        </div>
      </div>
    );
  }
}

export default Home;