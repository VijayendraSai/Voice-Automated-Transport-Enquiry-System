import React, { Component } from "react";
import Artyom from "artyom.js";
import "./TicketDetails.css";
const artyom = new Artyom();
export default class TicketDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketno: ""
    };
  }
  componentDidMount() {
    console.log("Component Mounted");

    artyom.restart();
    artyom.on(["enter ticket number as *"], true).then((i, wildcard) => {
      artyom.say("Ticket number is : " + wildcard.trim());
      this.setState({
        ticketno: wildcard.trim()
      });
    });
    //Pause Listening
    artyom.on(["pause listening"]).then(i => {
      artyom.say("Pausing recognition...");
      artyom.dontObey();
    });

    //Submit command
    artyom.on(["submit"]).then(i => {
      artyom.say("You've clicked submit");
      document.getElementById("submit").click();
    });

    artyom
      .initialize({
        lang: "en-GB", // GreatBritain english
        continuous: true, // Listen forever
        soundex: true, // Use the soundex algorithm to increase accuracy
        debug: true, // Show messages in the console
        // executionKeyword: "and do it now",
        listen: true, // Start to listen commands !
        obeyKeyword: "listen to me"
        // If providen, you can only trigger a command if you say its name
        // e.g to trigger Good Morning, you need to say "Jarvis Good Morning"
        // name: "Jarvis"
      })
      .then(() => {
        console.log("Artyom has been succesfully initialized");
      })
      .catch(err => {
        console.error("Artyom couldn't be initialized: ", err);
      });
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <form
        name="ticketInfoForm"
        id="ticketInfoForm"
        onSubmit={this.handlesubmit}
        className="ticketform"
      >
        <div className="ticketdetails">
          <h2>Enter Ticket Details</h2>
          <div className="ticketnum">
            <label>Ticket Number:</label>
            <input
              type="text"
              pattern="[0-9]"
              name="ticketno"
              onChange={this.handleChange}
              value={this.state.ticketno}
            />
          </div>
          <div className="submission">
            <input
              type="submit"
              name="submit"
              id="submit"
              onClick={e => {
                // event.preventDefault()
                const data = new URLSearchParams();
                for (const pair of new FormData(
                  document.getElementById("ticketInfoForm")
                )) {
                  data.append(pair[0], pair[1]);
                  console.log(pair[0], pair[1]);
                }
                e.preventDefault();
                fetch("http://localhost:8000/query/displayTicket", {
                  method: "post",
                  body: data
                })
                  .then(res => {
                    console.log(res);
                    return res.json();
                  })
                  .then(json => {
                    console.log(json);
                    var ticketDetails = json;
                    if (json.errno === 1062) {
                      alert("No Ticket available");
                      this.props.history.push("/ticketDetails");
                    } else {
                      // Display json
                      var items_table = "";
                      var speak_data = "";
                      for (var ctr = 0; ctr < ticketDetails.length; ctr++) {
                        items_table +=
                          "<tr><td>" +
                          ticketDetails[ctr]["ticketid"] +
                          "</td><td>" +
                          ticketDetails[ctr]["timestamp"] +
                          "</td><td>" +
                          ticketDetails[ctr]["DOJ"] +
                          "</td><td>" +
                          ticketDetails[ctr]["busid"] +
                          "</td><td>" +
                          ticketDetails[ctr]["busname"] +
                          "</td><td>" +
                          ticketDetails[ctr]["origin"] +
                          "</td><td>" +
                          ticketDetails[ctr]["destination"] +
                          "</td><td>" +
                          ticketDetails[ctr]["arrivaltime"] +
                          "</td><td>" +
                          ticketDetails[ctr]["departuretime"] +
                          "</td><td>" +
                          ticketDetails[ctr]["ac"] +
                          "</td><td>" +
                          ticketDetails[ctr]["journeytime"] +
                          "</td></tr>";

                        speak_data +=
                          ctr +
                          1 +
                          " " +
                          ticketDetails[ctr]["ticketid"] +
                          " " +
                          ticketDetails[ctr]["timestamp"] +
                          " " +
                          ticketDetails[ctr]["DOJ"] +
                          " " +
                          ticketDetails[ctr]["busid"] +
                          " " +
                          ticketDetails[ctr]["busname"] +
                          " " +
                          ticketDetails[ctr]["origin"] +
                          " " +
                          ticketDetails[ctr]["destination"] +
                          " " +
                          ticketDetails[ctr]["arrivaltime"] +
                          " " +
                          ticketDetails[ctr]["departuretime"] +
                          ticketDetails[ctr]["departuretime"] +
                          " " +
                          ticketDetails[ctr]["ac"] +
                          " " +
                          ticketDetails[ctr]["journeytime"] +
                          "\n";
                      }
                      items_table =
                        " <table><tr><th>Ticket Id</th><th>Timestamp</th><th>Date of Journey</th><th>Bus ID</th><th>Bus Name</th><th>Origin</th><th>Destination</th><th>Arrival Time</th><th>Departure Time</th><th>AC</th><th>Journey Time</th></tr>" +
                        items_table +
                        "</table>";
                      document.getElementById(
                        "detailstable"
                      ).innerHTML = items_table;
                      artyom.say(`${speak_data}`, {
                        onStart: function() {
                          console.log("The text is being readed");
                        },
                        onEnd: function() {
                          console.log(
                            "Well, that was all. Try with a longer text !"
                          );
                        }
                      });
                    }
                  });

                console.log("i am from clodemoadl in ticket");
              }}
            />
          </div>
        </div>
        <span className="detailstable" id="detailstable"></span>
      </form>
    );
  }
}
