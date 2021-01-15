import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUser } from "../../actions/authActions";
import classnames from "classnames";
import "./UserProfile.css";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            firstname: "",
            lastname: "",
            address: "",
            errors: {}
        };
    }
    // if someone isnt logged in, push login
    componentDidMount() { 
        if (!this.props.auth.isAuthenticated) {
          this.props.history.push("/login");
        }
      }
    
      // some error handling
      UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    //sets value when some input is given  
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    onSubmit = e => {
        e.preventDefault();
    const newUser = {
          email: this.state.email,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          address: this.state.address,
        };
    
    //updates the chosen user in the database
    const data = this.props.match.params.id;
    this.props.editUser("user/" , newUser, data); 
      };
    render() {
        const { errors } = this.state;
    return (

          /* DISPLAY INPUT FIELDS FOR UPDATING USER */
          <div className="container">
            <div className="row">
              <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                  <i className="material-icons left"></i> Back to home
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <h4>
                    <b>Edit User Info</b>
                  </h4>
                  <p className="grey-text text-darken-1">
                    Want to go back to the users? <Link to="/householdusers">Users</Link>
                  </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
    
                {/* EMAIL */}
                <div className="input-field col s12">
                <label htmlFor="email">Email</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      className={classnames("", {
                        invalid: errors.email
                      })}
                    />
                    <span className="red-text">{errors.email}</span>
                  </div>
    
                  {/* FIRSTNAME */}
                  <div className="input-field col s12">
                  <label htmlFor="name">First Name</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.firstname}
                      error={errors.firstname}
                      id="firstname"
                      type="text"
                      className={classnames("", {
                        invalid: errors.firstname
                      })}
                    />
                    <span className="red-text">{errors.firstname}</span>
                  </div>
    
                  {/* LASTNAME */}
                  <div className="input-field col s12">
                  <label htmlFor="lastname">Last Name</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.lastname}
                      error={errors.lastname}
                      id="lastname"
                      type="text"
                      className={classnames("", {
                        invalid: errors.lastname
                      })}
                    />
                    <span className="red-text">{errors.lastname}</span>
                  </div>
    
                  {/* ADDRESS */}
                  <div className="input-field col s12">
                  <label htmlFor="address">Address</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.address}
                      error={errors.address}
                      id="address"
                      type="text"
                      className={classnames("", {
                        invalid: errors.address
                      })}
                    />
    
                    <span className="red-text">{errors.address}</span>
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
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }
    }

EditProfile.propTypes = {
  editUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { editUser }
)(EditProfile);