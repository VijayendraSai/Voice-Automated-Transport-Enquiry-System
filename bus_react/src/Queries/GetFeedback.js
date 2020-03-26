import React, { Component } from "react";
import Artyom from "artyom.js";
import "./TicketDetails.css";
const artyom = new Artyom();

export default class GetFeedback extends Component {
  constructor() {
    super();

    this.state = {
      transcript: "",
      busid: ""
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

    artyom.on(["Enter bus id as *"], true).then((i, wildcard) => {
      switch (i) {
        case 0:
          let busid = wildcard.split(" ");
          let id = busid[0] + "" + busid[1];
          artyom.say("You've said bus id : " + id);
          this.setState({
            busid: id.trim()
          });
          // console.log("Origin in state : " + this.state.origin);
          break;
      }
    });

    //Submit command
    artyom.on(["submit"]).then(i => {
      artyom.say("You've clicked submit");
      document.getElementById("submit").click();
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
  handleSubmit = e => {
    // alert("Form submitted");
    // console.log("BusID:" + this.state.busid);
  };

  render() {
    console.log("Rendered");
    console.log("BusID in state : " + this.state.busid);
    return (
      <form
        name="getFeedbackForm"
        id="getFeedbackForm"
        onSubmit={this.handleSubmit}
        className="ticketform"
      >
        <div className="getFeedback">
          <label style={{ color: "white" }}>Enter Bus Id:</label>
          <input
            type="text"
            name="busid"
            value={this.state.busid.trim()}
            placeholder="Bus Id"
            onChange={this.handleChange}
            required
          />

          <div className="submission">
            <input
              type="submit"
              name="submit"
              id="submit"
              onClick={e => {
                // event.preventDefault()
                const data = new URLSearchParams();
                for (const pair of new FormData(
                  document.getElementById("getFeedbackForm")
                )) {
                  data.append(pair[0], pair[1]);
                  console.log(pair[0], pair[1]);
                }
                e.preventDefault();
                fetch("http://localhost:8000/query/getFeedback", {
                  method: "post",
                  body: data
                })
                  .then(res => {
                    console.log(res);
                    return res.json();
                  })
                  .then(json => {
                    console.log(json);
                    var feedbackDetails = json;
                    if (json.errno === 1452) {
                      alert("No Feedback received");
                      this.props.history.push("/getFeedback");
                    } else {
                      // Display json
                      var items_table = "";
                      var speak_data = "";
                      for (var ctr = 0; ctr < feedbackDetails.length; ctr++) {
                        items_table +=
                          "<tr><td>" +
                          (ctr + 1) +
                          "</td><td>" +
                          feedbackDetails[ctr]["message"];
                        speak_data +=
                          ctr +
                          1 +
                          " " +
                          feedbackDetails[ctr]["message"] +
                          "\n";
                      }
                      items_table =
                        " <table><tr><th>Feedback_No</th><th>Feedback</th></tr>" +
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
                console.log("i am from clodemoadl in feedback");
              }}
            />
          </div>
        </div>
        <span className="detailstable" id="detailstable"></span>
      </form>
    );
  }
}
