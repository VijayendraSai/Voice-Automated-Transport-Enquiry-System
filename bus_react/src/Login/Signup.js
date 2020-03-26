import React from "react";
import "./Signup.css";
import { EnquiryConsumer } from "../context";

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      type: " ",
      username: "",
      password: "",
      password2: "",
      errors: {
        firstname: "",
        lastname: "",
        email: " ",
        phone: " ",
        username: "",
        password: " ",
        password2: " "
      }
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case "firstname":
        errors.name =
          value.length < 5
            ? "Full Name must be atleast 5 characters long!"
            : "";
        break;
      case "lastname":
        errors.name =
          value.length < 5
            ? "Full Name must be atleast 5 characters long!"
            : "";
        break;
      case "email":
        errors.email = value.length < 5 ? "Email is not valid!" : "";
        break;
      case "phone":
        errors.phone =
          value.length !== 10 ? "Phone must be 10 characters long!" : "";
        break;
      case "username":
        errors.name =
          value.length < 5
            ? "Full Name must be atleast 5 characters long!"
            : "";
        break;
      case "password":
        errors.password = value.length < 5 ? "Password too short" : "";
        break;

      case "password2":
        errors.password2 =
          value !== this.state.password ? "Passwords not matching" : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handlesubmit = e => {
    if (!validateForm(this.state.errors)) {
      e.preventDefault();
      alert("invalidformdetails");
    }
  };

  render() {
    return (
      <EnquiryConsumer>
        {value => {
          return (
            <div className="wrapper">
              <div className="form-wrapper">
                <form
                  name="customerInfoForm"
                  id="customerInfoForm"
                  onSubmit={this.handlesubmit}
                >
                  <div class="intro">Please fill in your details</div>

                  <div class="customerInfo">
                    <div class="firstname">
                      <label>First Name</label>
                      <input
                        onChange={this.handleChange}
                        name="firstname"
                        type="text"
                        placeholder="firstname"
                      />
                      <div class="errors">{this.state.errors.firstname} </div>
                    </div>
                    <div class="lastname">
                      <label>Last Name</label>
                      <input
                        onChange={this.handleChange}
                        name="lastname"
                        type="text"
                        placeholder="lastname"
                      />
                      <div class="errors">{this.state.errors.lastname} </div>
                    </div>
                    <div class="email">
                      <label>Email</label>
                      <input
                        onChange={this.handleChange}
                        name="email"
                        type="text"
                        placeholder="E-mail"
                      />
                      <div class="errors">{this.state.errors.email} </div>
                    </div>
                    <div class="phone">
                      <label>Phone</label>
                      <input
                        onChange={this.handleChange}
                        name="phone"
                        type="number"
                        placeholder="Phone"
                      />
                      <div class="errors">{this.state.errors.phone} </div>
                    </div>
                  </div>

                  <div class="username">
                    <label>Username</label>
                    <input
                      onChange={this.handleChange}
                      name="username"
                      type="text"
                      placeholder="username"
                    />
                    <div class="errors">{this.state.errors.password} </div>
                  </div>

                  <div class="password">
                    <label>Password</label>
                    <input
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                    <div class="errors">{this.state.errors.password} </div>
                  </div>
                  <div class="password2">
                    <label>Re-Enter Password</label>
                    <input
                      onChange={this.handleChange}
                      name="password2"
                      type="password"
                      placeholder="Re-Enter Password"
                    />
                    <div class="errors">{this.state.errors.password2} </div>
                  </div>
                  <div class="type">
                    <label>Type</label>
                    <input
                      onChange={this.handleChange}
                      name="type"
                      type="text"
                      placeholder="USER / ADMIN"
                    />
                  </div>

                  <div class="submission">
                    <input
                      type="submit"
                      onClick={e => {
                        // event.preventDefault()
                        const data = new URLSearchParams();
                        for (const pair of new FormData(
                          document.getElementById("customerInfoForm")
                        )) {
                          data.append(pair[0], pair[1]);
                          console.log(pair[0], pair[1]);
                        }
                        e.preventDefault();
                        fetch("http://localhost:8000/crud/create", {
                          method: "post",
                          body: data
                        })
                          .then(res => {
                            console.log(res);
                            return res.json();
                          })
                          .then(json => {
                            console.log(json);
                            var userDetails = json;
                            if (json.errno === 1062) {
                              alert("User already registered please login");
                              this.props.history.push("/login");
                            } else {
                              alert("Registeration successfull");
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
                </form>
              </div>
            </div>
          );
        }}
      </EnquiryConsumer>
    );
  }
}
