import React from "react";
import "./NotFound.css";

class NotFound extends React.Component{

  constructor(){
    super();
  }

  render(){
    return (
      <div className="NotFound text-center">
        <h3>Sorry, page not found!</h3>
      </div>
    );
  }
}

export default NotFound;