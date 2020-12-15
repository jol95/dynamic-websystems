import React from "../login/node_modules/react";
import "./NotFound.css";

class NotFound extends React.Component{

  constructor(props){
    super(props);
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