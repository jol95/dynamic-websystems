import React, { Component } from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import DefaultImg from './defaultimg.png';
import './ProfileImg.css';

class ProfileImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseImage: DefaultImg
        }
    }

    setDefaultImage() {
        this.setState({
            baseImage: DefaultImg
        });
    }

    // function to capture base64 format of an image
    getBaseFile(files) {
    // create a local readable base64 instance of an image
    this.setState({
      baseImage: files.base64
    });

    let imageObj = {
      imageData: files.base64.toString()
    };

    axios.post("API", imageObj)
      .then((data) => {
        if (data.data.success) {
          alert("Image has been successfully uploaded using base64 format");
          this.setDefaultImage("base");
        }
      })
      .catch((err) => {
        alert("Error while uploading image using base64 format")
        this.setDefaultImage("base");
      });
  }


    render() {
        return (
            <div>
                <FileBase type="file" multiple={false} onDone={this.getBaseFile.bind(this)} />
            </div>
            //<img src={this.state.baseImage} alt="upload-image" className="process__image" />

        )
    }
}
  export default ProfileImg;