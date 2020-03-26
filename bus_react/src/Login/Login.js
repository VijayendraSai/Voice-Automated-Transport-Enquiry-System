import React from "react";
import "./Login.css";
// import {userDetails} from "../data"
import { EnquiryConsumer } from "../context";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: " "
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("us : " + this.state.username);
    console.log("pa : " + this.state.password);
  };

  handlesubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <EnquiryConsumer>
        {value => {
          return (
            <div className="wrapper">
              <div className="form-wrapper">
                <form
                  name="customerForm"
                  id="customerForm"
                  onSubmit={this.handlesubmit}
                >
                  <div className="intro text-center">Sign In</div>

                  <div className="customerInfo">
                    <div className="username">
                      <label>Username</label>
                      <input
                        name="username"
                        id="username"
                        type="text"
                        value={this.state.username.trim()}
                        placeholder="Username"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="password">
                      <label>Password</label>
                      <input
                        name="password"
                        id="password"
                        value={this.state.password.trim()}
                        onChange={this.handleChange}
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div className="submission">
                    <input
                      type="submit"
                      onClick={() => {
                        // event.preventDefault()
                        const data = new URLSearchParams();
                        for (const pair of new FormData(
                          document.getElementById("customerForm")
                        )) {
                          data.append(pair[0], pair[1]);
                          console.log(pair[0], pair[1]);
                        }

                        fetch("http://localhost:8000/signin/login", {
                          method: "post",
                          body: data
                        })
                          .then(res => {
                            return res.json();
                          })
                          .then(json => {
                            console.log(json);

                            var userDetails = json;
                            var receivedPassword = json.password;
                            console.log(
                              "rp : " +
                                receivedPassword +
                                " jp: " +
                                json.password +
                                " sp: " +
                                this.state.password
                            );
                            if (receivedPassword === null) {
                              alert("Username not found, please Signup");
                            } else if (
                              receivedPassword.toString() !==
                              this.state.password
                            ) {
                              alert("Invalid password");
                              value.changeStatus(false);
                            } else {
                              value.setUser(userDetails);
                              value.changeStatus(true);
                              if (userDetails.type === "ADMIN") {
                                value.changeAdminStatus(true);
                              }
                              try {
                                this.props.history.push("/");
                              } catch (e) {
                                alert(e.message);
                              }
                            }
                          });

                        console.log("i am from clodemoadl in login");
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <span
                      onClick={() => {
                        this.props.history.push("/signup");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      New Customer? Sign Up
                    </span>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </EnquiryConsumer>
    );
  }
}
