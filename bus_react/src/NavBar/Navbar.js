import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { EnquiryConsumer } from "../context";
import "../NavBar/Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <EnquiryConsumer>
        {value => {
          const { status } = value;
          return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
              <ul className="navbar-nav align-items-center">
                <li className="nav-item ml-5">
                  <Link to="/" className="nav-link">
                    Enquiry
                  </Link>
                </li>
              </ul>

              <Link
                to={status ? "/userprofile" : "/login"}
                className="nav-link "
              >
                {status ? value.userDetails.firstname : "login | signup"}
              </Link>

              <Link to="/about" className="nav-link">
                About
              </Link>
            </NavWrapper>
          );
        }}
      </EnquiryConsumer>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;

export default Navbar;
