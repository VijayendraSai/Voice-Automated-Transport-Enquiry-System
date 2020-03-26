import React, { Component } from "react";
import Artyom from "artyom.js";
import "./Search_Bus.css";

// Create a variable that stores your instance
const artyom = new Artyom();

export default class Artyommain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transcript: "",
      origin: "",
      destination: "",
      doj: ""
    };
  }

  componentDidMount() {
    console.log("Component Mounted");

    // Add command (Short code artisan way)
    artyom.on(["Good morning", "Good afternoon"]).then(i => {
      switch (i) {
        case 0:
          artyom.say("Good morning, how are you?");
          break;
        case 1:
          artyom.say("Good afternoon, how are you?");
          break;
      }
    });

    // Smart command (Short code artisan way), set the second parameter of .on to true
    artyom.on(["Repeat after me *"], true).then((i, wildcard) => {
      artyom.say("You've said : " + wildcard);
    });

    artyom
      .on(["Enter origin as *", "Enter destination as *"], true)
      .then((i, wildcard) => {
        switch (i) {
          case 0:
            artyom.say("You've said origin : " + wildcard);
            this.setState({
              origin: wildcard.trim()
            });
            // console.log("Origin in state : " + this.state.origin);
            break;
          case 1:
            artyom.say("You've said destination : " + wildcard);
            this.setState({
              destination: wildcard.trim()
            });
            // console.log("Destination in state : " + this.state.destination);
            break;
        }
      });

    //Submit command
    artyom.on(["submit"]).then(i => {
      artyom.say("You've clicked submit");
      document.getElementById("submit").click();
    });

    artyom.on(["Date *"], true).then((i, wildcard) => {
      artyom.say("You've said:" + wildcard);
    });

    //Pause Listening
    artyom.on(["pause listening"]).then(i => {
      artyom.say("Pausing recognition...");
      artyom.dontObey();
    });

    // Start the commands !
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

    // artyom.simulateInstruction("Enter origin as Hyderabad");
    // artyom.simulateInstruction("Enter destination as Coimbatore");
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value.trim()
    });
  };

  handlesubmit = e => {
    // if (!validateForm(this.state.errors)) {
    //   e.preventDefault();
    //   alert("invalidformdetails");
    // }
  };

  render() {
    console.log("Rendered");
    console.log("Origin in state : " + this.state.origin);
    console.log("Destination in state : " + this.state.destination);
    console.log("doj : " + this.state.doj);

    return (
      <form
        name="searchBusForm"
        id="searchBusForm"
        onSubmit={this.handlesubmit}
        className="buscss"
      >
        <div className="busdetails">
          <h2>Enter Bus Details</h2>
          <div className="originInfo">
            <label>Origin:</label>
            <input
              type="text"
              name="origin"
              id="origin"
              onChange={this.handleChange}
              value={this.state.origin.trim()}
              placeholder="From"
            />
          </div>
          <div className="csdestination">
            <label>Destination:</label>
            <input
              type="text"
              name="destination"
              id="destination"
              onChange={this.handleChange}
              value={this.state.destination.trim()}
              placeholder="To"
            />
          </div>
          <div className="csdate">
            <label>Date Of Journey:</label>
            <input
              type="date"
              name="doj"
              id="doj"
              onChange={this.handleChange}
              value={this.state.doj}
              placeholder="DOJ"
            />
          </div>
          <div className="submission">
            <input
              type="submit"
              name="submit"
              id="submit"
              className="Submit"
              onClick={e => {
                // event.preventDefault()
                const data = new URLSearchParams();
                for (const pair of new FormData(
                  document.getElementById("searchBusForm")
                )) {
                  data.append(pair[0], pair[1]);
                  console.log(pair[0], pair[1]);
                }
                e.preventDefault();
                fetch("http://localhost:8000/query/displayBus", {
                  method: "post",
                  body: data
                })
                  .then(res => {
                    console.log(res);
                    return res.json();
                  })
                  .then(json => {
                    console.log(json);
                    var busDetails = json;
                    if (json.errno === 1062) {
                      alert("No buses available");
                      this.props.history.push("/searchBus");
                    } else {
                      // Display json
                      var items_table = "";
                      var speak_data = "";
                      for (var ctr = 0; ctr < busDetails.length; ctr++) {
                        items_table +=
                          "<tr><td>" +
                          busDetails[ctr]["busid"] +
                          "</td><td>" +
                          busDetails[ctr]["busname"] +
                          "</td><td>" +
                          busDetails[ctr]["arrivaltime"] +
                          "</td><td>" +
                          busDetails[ctr]["departuretime"] +
                          "</td><td>" +
                          busDetails[ctr]["ac"] +
                          "</td><td>" +
                          busDetails[ctr]["bustype"] +
                          "</td><td>" +
                          busDetails[ctr]["fare"] +
                          "</td></tr>";

                        speak_data +=
                          ctr +
                          1 +
                          " " +
                          busDetails[ctr]["busid"] +
                          " " +
                          busDetails[ctr]["busname"] +
                          " " +
                          busDetails[ctr]["arrivaltime"] +
                          " " +
                          busDetails[ctr]["departuretime"] +
                          " " +
                          busDetails[ctr]["ac"] +
                          " " +
                          busDetails[ctr]["bustype"] +
                          " " +
                          busDetails[ctr]["fare"] +
                          "\n";
                      }
                      items_table =
                        " <table><tr><th>Bus Id</th><th>Bus Name</th><th>Arrival Time</th><th>Departure Time</th><th>AC</th><th>Bus Type</th><th>Fare</th></tr>" +
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

                console.log("i am from clodemoadl in bus");
              }}
            />
          </div>
        </div>
        <span className="detailstable" id="detailstable"></span>
      </form>
    );
  }
}
