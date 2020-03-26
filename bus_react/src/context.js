import React, { Component } from "react";

const EnquiryContext = React.createContext();

class EnquiryProvider extends Component {
  state = {
    userDetails: {},
    status: false,
    adminStatus: false
  };

  setUser = user => {
    this.setState(() => {
      return { userDetails: user };
    });
    console.log(user);
  };

  changeStatus = bool => {
    this.setState(() => {
      return { status: bool };
    });
  };

  changeAdminStatus = bool => {
    this.setState(() => {
      return { adminStatus: bool };
    });
  };

  render() {
    return (
      <EnquiryContext.Provider
        value={{
          ...this.state,
          changeStatus: this.changeStatus,
          changeAdminStatus: this.changeAdminStatus,
          setUser: this.setUser
        }}
      >
        {this.props.children}
      </EnquiryContext.Provider>
    );
  }
}

const EnquiryConsumer = EnquiryContext.Consumer;
export { EnquiryProvider, EnquiryConsumer, EnquiryContext };
