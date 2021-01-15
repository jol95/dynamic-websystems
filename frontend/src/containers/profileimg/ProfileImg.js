import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateDatabase } from "../../actions/authActions";
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

  //uses base64 to make the imagine into a string for easy storage
  onChange = e => {
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

   //sets value when some input is given  
  onSubmit = e => {
      e.preventDefault();
      const newUpdate = {img: this.state.base64TextString}

    
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = this.state.base64TextString;
    this.setState({
      display: base64Flag + imageStr
    })
  const { user } = this.props.auth;
  const data = user.id;
  var kind = "";
  if(user.role === "manager"){
    kind = "manager/";
  } else if(user.role === "user"){
    kind = "household/";
  }

  this.props.updateDatabase(kind, newUpdate, data);

  };

  render () {
  return(
     <div>
      <form noValidate onSubmit={this.onSubmit}>   
    <div>

    {/*<UserProfile/>*/}
      <label class="custom-file">
        <input
          type="file"
          name="image"
          id="file"
          accept=".jpeg, .png, .jpg"
          onChange = {this.onChange}
        />
        </label>
        
        </div>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Submit image
            </button>
          </div>
        </form>
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