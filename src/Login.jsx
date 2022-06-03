import React, { Component } from "react";
import history from "./history";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "scott@test.com", password: "scott123", message: "" };
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <h4 className="my-1 py-2 border-bottom">Login</h4>

          {/* Email starts */}
          <div className="form-group form-row">
            <label className="col-lg-4">Email:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={(event) => {
                this.setState({ email: event.target.value });
              }}
            />
          </div>
          {/* Email ends */}

          {/* Password starts */}
          <div className="form-group form-row">
            <label className="col-lg-4">Password:</label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={(event) => {
                this.setState({ password: event.target.value });
              }}
            />
          </div>
          {/* Password ends */}

          <div className="text-right">
            <button className="btn btn-primary m-1" onClick={this.onLoginClick}>
              Login
            </button>

            {this.state.message}
          </div>
        </div>
      </div>
    );
  }

  onLoginClick = async () => {
    console.log(this.state);

    var response = await fetch(
      `https://my-first-app-vishal.herokuapp.com/users?email=${this.state.email}&password=${this.state.password}`,
      { method: "GET" }
    );

    var body = await response.json();
    console.log(body);
    if (body.length > 0) {
      //success

      //update the message property of state of current component
      this.setState({
        message: <span className="text-success">Successfully Logged-in</span>,
      });

      //call the AppComponent's updateIsLoggedInStatus method

      this.props.updateIsLoggedInStatus(true);

      //navigate to dashboard
      history.replace("/dashboard");
    } else {
      //error
      this.setState({
        message: (
          <span className="text-danger">Invalid Login Please try again</span>
        ),
      });
    }
  };
}
