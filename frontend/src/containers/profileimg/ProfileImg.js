import React from 'react';
import axios from 'axios';
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