import React, { Component } from "react";
import Title from "../NavBar/Title";
import "./abt.css";

class About extends Component {
  render() {
    return (
      <div className="about">
        <React.Fragment>
          <Title title="Voice Based Automated Bus Enquiry System" />
          <div className="col-10 mx-auto text-center text-slanted text-blue ">
            <table id="t01">
              <tr>
                <th>Done By</th>
              </tr>
              <tr>Ch. Vijayendra Sai</tr>
              <tr>K. Ajay Kumar Reddy</tr>
              <tr>Hemanth</tr>
              <tr>VVS Sundeep</tr>
            </table>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default About;
