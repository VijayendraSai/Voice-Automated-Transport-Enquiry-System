import React from "react";
import SimpleReactValidator from "simple-react-validator";
import "./insertRoute.css";

class InsertRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeid: "",
      origin: "",
      destination: ""
    };
    this.baseState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleState = this.handleState.bind(this);
  }
  componentWillMount() {
    this.validator = new SimpleReactValidator();
  }

  handleState(event) {
    this.setState(this.baseState);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
        name="insertRouteForm"
        id="insertRouteForm"
        onSubmit={this.handleSubmit}
        className="insRoucss"
      >
        <div className="minput1">
          <span>Route id: </span>
          <input type="text" name="routeid" onChange={this.handleChange} />
          {this.validator.message(
            "routeid",
            this.state.routeid,
            "required|alpha"
          )}
        </div>
        <div className="minput2">
          <span>Origin :</span>
          <input type="text" name="origin" onChange={this.handleChange} />
          {this.validator.message(
            "origin",
            this.state.origin,
            "required|alpha"
          )}
        </div>
        <div className="minput3">
          <span>Destination :</span>
          <input type="text" name="destination" onChange={this.handleChange} />
          {this.validator.message(
            "destination",
            this.state.destination,
            "required|alpha"
          )}
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
                document.getElementById("insertRouteForm")
              )) {
                data.append(pair[0], pair[1]);
                console.log(pair[0], pair[1]);
              }
              e.preventDefault();
              fetch("http://localhost:8000/query/insertRoute", {
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
                    alert("Error while Inserting Route");
                    //this.props.history.push("/searchBus");
                    this.handleState();
                  } else {
                    alert("Route Inserted");
                    this.handleState();
                  }
                });

              console.log("i am from clodemoadl in insert route");
            }}
          />
        </div>
      </form>
    );
  }
}
export default InsertRoute;
