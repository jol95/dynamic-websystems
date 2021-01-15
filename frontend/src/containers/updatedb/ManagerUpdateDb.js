import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateDatabase } from "../../actions/authActions";

class ManagerUpdateDb extends Component {
    constructor() {
      super();
      this.state = {
        status: "running",
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

        onSubmit2 = e => {
          e.preventDefault();
        const newUpdate = {
          status: this.state.status,
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
                  style={{width: 300}}
                  onChange={this.onChange}
                  value={this.state.price}
                  error={errors.price}
                  id="price"
                  type="range"
                  min="0"
                  max="20"
                  step="0.1"
                  //value="0.5"
                />
                <p>{this.state.price}</p>
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
                </form>

                <form noValidate onSubmit={this.onSubmit2}>
                {/* DROPDOWN FOR STATUS ON/OFF */}
                <div className="input-field col s12">
                <label htmlFor="status">Status</label>
                <select
                  onChange={this.onChange}
                  value={this.state.status}
                  id="status"
                  type="text"
                  >
                <option value="running">On</option>
                <option value="off">Off</option>
                </select>      

              </div>   
            </div>
            {/* STATUS SUBMIT BUTTON */}
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
                Update Status
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