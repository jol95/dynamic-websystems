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

      convertBase64 = (file) => {
      return new Promise((resolve, reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
      this.setState({
          errors: nextProps.errors
      });
      }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
    const newUpdate = {
      img: this.state.img,
    };
    const base64 = await this.convertBase64(file);
    console.log(base64);};
    const { user } = this.props.auth;
    const data = user.houseid.split(" ")[0]
    this.props.updateDatabase(newUpdate, data);
    const data = user.houseid.split(" ")[0]
    this.props.updateDatabase(newUpdate, data); 
    };

    render() {
      const { errors } = this.state;
        return (
            <div>
                <div>
                  <input 
                    type="file"
                    onChange = {this.onChange}
                  />
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