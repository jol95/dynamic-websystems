import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateDatabase } from "../../actions/authActions";

class ManagerUpdateDb extends Component {
    constructor() {
      super();
      this.state = {
        price: 0,
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
        this.setState({ [e.target.id]: e.target.value });
    };
        onSubmit = e => {
          e.preventDefault();
        const newUpdate = {
          price: this.state.price,
        };
        
    console.log("ManagerUpdateDB manager newupdate", newUpdate);
    this.props.updateDatabase("grid", newUpdate, "/"); 

    };

    render() {
        const { errors } = this.state;
    return (
     
        <div className="container">
            <form noValidate onSubmit={this.onSubmit}>
              
              {/* PRICE */}
              <div className="input-field col s12">
              <label htmlFor="slider">Price</label>
                <input
                  onChange={this.onChange}
                  value={this.state.price}
                  error={errors.price}
                  id="price"
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  //value="0.5"
                />

                <span className="red-text">{errors.price}</span>
              </div>

              {/* PRICE SUBMIT BUTTON */}
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
                  Update price
                </button>
              </div>
            </form>
          </div>
    );
    }
}
ManagerUpdateDb.propTypes = {
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
)( ManagerUpdateDb );