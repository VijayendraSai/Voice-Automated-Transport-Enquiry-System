import React from "react";
import "./insertTicket.css";

class InsertTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      ticketid: "",
      doj: "",
      busid: "",
      seat1: "",
      seat2: "",
      seat3: ""
    };
    this.baseState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleState(event) {
    this.setState(this.baseState);
  }

  handleSubmit(event) {
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
        name="insertTicketForm"
        id="insertTicketForm"
        onSubmit={this.handleSubmit}
        className="InsTic"
      >
        <h1 style={{ color: "White" }}> Add Ticket </h1>
        <div class="Username" className="minput1">
          <span>Username : </span>
          <input type="text" name="username" onChange={this.handleChange} />
        </div>

        <div className="minput2">
          <span>Ticket ID :</span>
          <input type="text" name="ticketid" onChange={this.handleChange} />
        </div>

        <div className="minput3">
          <span>Date Of Journey :</span>
          <input type="date" name="doj" onChange={this.handleChange} />
        </div>

        <div className="minput4">
          <span>Bus ID :</span>
          <input type="text" name="busid" onChange={this.handleChange} />
        </div>

        <div className="seatclass" id="seatclass">
          <div className="minput5">
            <span>Seat1:</span>
            <input type="text" name="seat1" onChange={this.handleChange} />
          </div>

          <div className="minput6">
            <span>Seat2:</span>
            <input type="text" name="seat2" onChange={this.handleChange} />
          </div>
          <div className="minput7">
            <span>Seat3:</span>
            <input type="text" name="seat3" onChange={this.handleChange} />
          </div>
        </div>

        <div className="submission" className="sinput">
          <input
            type="submit"
            name="submit"
            id="submit"
            onClick={e => {
              // event.preventDefault()
              const data = new URLSearchParams();
              for (const pair of new FormData(
                document.getElementById("insertTicketForm")
              )) {
                data.append(pair[0], pair[1]);
                console.log(pair[0], pair[1]);
              }
              e.preventDefault();
              fetch("http://localhost:8000/query/insertTicket", {
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
                  if (json.errno === 1292) {
                    alert("Error while Inserting Ticket");
                    //this.props.history.push("/searchBus");
                    this.handleState();
                  } else {
                    alert("Ticket Inserted");
                    this.handleState();
                  }
                });

              console.log("i am from clodemoadl in insert ticket");
            }}
          />
        </div>
      </form>
    );
  }
}
export default InsertTicket;
