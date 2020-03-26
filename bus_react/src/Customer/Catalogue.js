import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { EnquiryConsumer } from "../context";

class Catalogue extends Component {
  render() {
    return (
      <EnquiryConsumer>
        {value => {
          const { status, adminStatus } = value;
          return (
            <div className="container mt-3">
              <div className="col d-flex flex-column">
                <Link to="/searchBus">
                  <CatalogueItem className="text-capitalize mx-auto">
                    Find Buses
                  </CatalogueItem>
                </Link>
                <Link to="/ticketDetails">
                  <CatalogueItem className="text-capitalize mx-auto">
                    Ticket Details
                  </CatalogueItem>
                </Link>
                <Link to="/ticketSeats">
                  <CatalogueItem className="text-capitalize mx-auto">
                    Ticket Seats
                  </CatalogueItem>
                </Link>
                <Link to={status ? "/addFeedback" : "/login"}>
                  <CatalogueItem className="text-capitalize mx-auto">
                    Give Feedback
                  </CatalogueItem>
                </Link>
                <Link to="/getFeedback">
                  <CatalogueItem className="text-capitalize mx-auto">
                    Feedback Details
                  </CatalogueItem>
                </Link>
                <br />
                <span>Admin</span>
                <Link to={status && adminStatus ? "/addBus" : "/login"}>
                  <CatalogueItem className="text-capitalize mx-auto">
                    Insert Bus
                  </CatalogueItem>
                </Link>
                <Link to={status && adminStatus ? "/addTicket" : "/login"}>
                  <CatalogueItem className="text-capitalize mx-auto">
                    Insert Ticket
                  </CatalogueItem>
                </Link>
                <Link to={status && adminStatus ? "/addRoute" : "/login"}>
                  <CatalogueItem className="text-capitalize mx-auto">
                    Insert Route
                  </CatalogueItem>
                </Link>
              </div>
            </div>
          );
        }}
      </EnquiryConsumer>
    );
  }
}
const CatalogueItem = styled.div`
  border-radius: 0.2rem;
  background-color: #ffffff;
  transition: all 0.3s linear;

  &:hover {
    box-shadow: 1px 1px 5px 0px;
  }
  margin: 5px;
  width: 100%;
  padding-top: 5px;
  text-align: center;
`;
export default Catalogue;
