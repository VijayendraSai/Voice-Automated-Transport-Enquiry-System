import React from "react";
import SimpleReactValidator from "simple-react-validator";
import "./insertbus.css";

class InsertBus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busid: "",
      busname: "",
      busfare: 0,
      arrivaltime: "",
      departuretime: "",
      ac: "",
      bustype: "",
      totalseats: 0,
      routeid: ""
    };
    this.baseState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleState = this.handleState.bind(this);
  }
  componentWillMount() {
    this.validator = new SimpleReactValidator();
  }

  handleChange(event) {
    if (event.target.name === "busfare" || event.target.name === "totalseats") {
      let val = Number(event.target.value);
      this.setState({ [event.target.name]: val });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleState(event) {
    this.setState(this.baseState);
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    if (this.validator.allValid()) {
      this.setState(this.baseState);
      alert("You submitted the form correctly!");
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  }
  render() {
    return (
      <form
        name="insertBusForm"
        id="insertBusForm"
        onSubmit={this.handleSubmit}
        className="insbuscss"
      >
        <h1 style={{ color: "white" }}>Insert Bus </h1>
        <div className="inputbox">
          <span> Enter bus id: :</span>
          <input type="text" name="busid" onChange={this.handleChange} />
          {this.validator.message("busid", this.state.busid, "required|alpha")}
        </div>
        <div className="inputbox">
          <span> Enter Bus Name :</span>
          <input type="text" name="busname" onChange={this.handleChange} />
          {this.validator.message(
            "busname",
            this.state.busname,
            "required|alpha"
          )}
        </div>
        <div className="inputbox">
          <span> Bus Fare :</span>
          <input type="text" name="busfare" onChange={this.handleChange} />
          {this.validator.message(
            "busfare",
            this.state.busfare,
            "required|alpha"
          )}
        </div>
        <div className="inputbox">
          <span> Arrival Time :(HH:MM:SS)</span>
          <input type="text" name="arrivaltime" />
          {this.validator.message(
            "arrivaltime",
            this.state.arrivaltime,
            "required|alpha"
          )}
        </div>
        <div className="inputbox">
          <span> Departure Time :(HH:MM:SS)</span>
          <input type="text" name="departuretime" />
          {this.validator.message(
            "arrivaltime",
            this.state.arrivaltime,
            "required|alpha"
          )}
        </div>
        <div className="inputbox">
          <span> AC :</span>
          <input type="radio" name="ac" onChange={this.handleChange} />
        </div>
        <div className="inputbox">
          <span> Bus Type :</span>
          <input type="text" name="bustype" onChange={this.handleChange} />
          {this.validator.message(
            "bustype",
            this.state.bustype,
            "required|alpha"
          )}
        </div>
        <div className="inputbox">
          <span> Total Seats: </span>
          <input type="text" name="totalseats" onChange={this.handleChange} />
          {this.validator.message(
            "totalseats",
            this.state.totalseats,
            "required|alpha"
          )}
        </div>
        <div className="inputbox">
          <span> Route Id: </span>
          <input type="text" name="routeid" onChange={this.handleChange} />
          {this.validator.message(
            "routeid",
            this.state.routeid,
            "required|alpha"
          )}
        </div>
        <div className="submission">
          <input
            type="submit"
            name="submit"
            id="submit"
            className="sinput"
            onClick={e => {
              // event.preventDefault()
              const data = new URLSearchParams();
              for (const pair of new FormData(
                document.getElementById("insertBusForm")
              )) {
                data.append(pair[0], pair[1]);
                console.log(pair[0], pair[1]);
              }
              e.preventDefault();
              fetch("http://localhost:8000/query/insertBus", {
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
                  if (json.errno === 1366) {
                    alert("Error while Inserting bus");
                    //this.props.history.push("/searchBus");
                    this.handleState();
                  } else {
                    alert("Bus Inserted");
                    this.handleState();
                  }
                });

              console.log("i am from clodemoadl in insert bus");
            }}
          />
        </div>
      </form>
    );
  }
}
export default InsertBus;
