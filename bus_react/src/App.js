import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./NavBar/Navbar";
import Homepage from "./Customer/HomePage";
import About from "./NavBar/About";
import Login from "./Login/Login";
import UserProfile from "./NavBar/UserProfile";
import Signup from "./Login/Signup";
import SearchBus from "./Queries/Search_Bus";
import TicketDetails from "./Queries/TicketDetails";
import InsertBus from "./Queries/InsertBus";
import InsertTicket from "./Queries/InsertTicket";
import InsertRoute from "./Queries/InsertRoute";
import InsertFeedback from "./Queries/Feedback";
import GetFeedback from "./Queries/GetFeedback";
import SeatTickets from "./Queries/SeatsTicket";
import Default from "./Default/Default";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/about" exact component={About} />
        <Route exact path="/login" exact component={Login} />
        <Route exact path="/userprofile" exact component={UserProfile} />
        <Route exact path="/signup" exact component={Signup} />
        <Route exact path="/searchBus" exact component={SearchBus} />
        <Route exact path="/ticketDetails" exact component={TicketDetails} />
        <Route exact path="/ticketSeats" exact component={SeatTickets} />
        <Route exact path="/addFeedback" exact component={InsertFeedback} />
        <Route exact path="/getFeedback" exact component={GetFeedback} />
        <Route exact path="/addBus" exact component={InsertBus} />
        <Route exact path="/addTicket" exact component={InsertTicket} />
        <Route exact path="/addRoute" exact component={InsertRoute} />
        <Route component={Default} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
