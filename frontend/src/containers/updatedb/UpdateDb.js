import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateDatabase } from "../../actions/authActions";
import classnames from "classnames";

class UpdateDb extends Component {
    constructor() {
      super();
      this.state = {
        ratio: 0,
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
          ratio: this.state.ratio,
        };

    const { user } = this.props.auth;
    const data = user.houseid.split(" ")[0]
    this.props.updateDatabase(newUpdate, data); 
    };

    render() {
        const { errors } = this.state;
    return (
        <div className="container">
            <form noValidate onSubmit={this.onSubmit}>
              
              {/* RATIO */}
              <div className="input-field col s12">
              <label htmlFor="slider">Ratio</label>
                <input
                  onChange={this.onChange}
                  value={this.state.ratio}
                  error={errors.ratio}
                  id="ratio"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  //value="0.5"
                  oninput="this.nextElementSibling.value = this.value"
                />
                <output>0.5</output>

                <span className="red-text">{errors.ratio}</span>
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
                  Update ratio
                </button>
              </div>
            </form>
          </div>
    );
    }
}
UpdateDb.propTypes = {
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
)( UpdateDb );