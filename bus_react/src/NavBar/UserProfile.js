import React, { Component } from "react";
import { EnquiryConsumer } from "../context";
import Title from "../NavBar/Title";

class UserProfile extends Component {
  render() {
    return (
      <React.Fragment>
        <Title title="user profile" />
        <EnquiryConsumer>
          {value => {
            return (
              <div className="container py-5">
                <div className="col">
                  <div className="col-10 mx-auto text-center text-slanted text-blue ">
                    <h1>{value.userDetails.firstname}</h1>
                  </div>
                  <h4 className="col-10 mx-auto text-center text-title text-uppercase text-muted mt-3 mb-2">
                    {value.userDetails.email}
                  </h4>
                  <h4 className="col-10 mx-auto text-center text-title text-uppercase text-muted mt-3 mb-2">
                    {value.userDetails.mobile}
                  </h4>
                </div>
              </div>
            );
          }}
        </EnquiryConsumer>
      </React.Fragment>
    );
  }
}

export default UserProfile;
