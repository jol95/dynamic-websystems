import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateDatabase } from "../../actions/authActions";
import classnames from "classnames";
import FileBase from 'react-file-base64';
import DefaultImg from './defaultimg.png';
import './ProfileImg.css';


class ProfileImg extends Component {
    constructor() {
      super();
      this.state = {
        img: "",
        errors: {}
      };
    }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
    this.setState({
        errors: nextProps.errors
    });
    }
  }
  onChange = e => {
      console.log("file to upload", e.target.files[0])
      let file = e.target.files[0]
      this.setState({ [e.target.id]: e.target.value });

      if (file) {
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this)
        reader.readAsBinaryString(file)
      }
  };

  _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result
    this.setState({
      base64TextString: btoa(binaryString)
    })
  }


  onSubmit = e => {
      e.preventDefault();
      const preview = document.getElementById("profile-picture");
      console.log("binary string:", this.state.base64TextString)

      const newUpdate = {img: this.state.base64TextString}

  const { user } = this.props.auth;
  const data = user.houseid.split(" ")[0]
  this.props.updateDatabase(newUpdate, data); 

  preview.src = "data:image/png;base64," + this.state.base64TextString

  };

  render () {
    const { errors } = this.state;
  return(
    <div>
        <div>
          <input 
            type="file"
            name="image"
            id="file"
            accept=".jpeg, .png, .jpg"
            onChange = {this.onChange}
          />
          <input type="submit"/>
        </div>
    </div>

    )
  }
}


ProfileImg.propTypes = {
  updateDatabase: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { updateDatabase }
)( ProfileImg );