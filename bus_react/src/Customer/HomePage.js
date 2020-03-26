import React, { Component } from "react";
import { EnquiryConsumer } from "../context";
import Catalogue from "./Catalogue";
import Title from "../NavBar/Title";
import Artyom from "artyom.js";
import "./mainpage.css";

// Create a variable that stores your instance
const artyom = new Artyom();

class HomePage extends Component {
  componentDidMount = () => {
    artyom.shutUp();
  };

  render() {
    return (
      <React.Fragment>
        <Title name="" title="Bus Enquiry" className="hea" />
        <div className="d-flex flex-row">
          <div className="catalogue py-5">
            <Catalogue />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
