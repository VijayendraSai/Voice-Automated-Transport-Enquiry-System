import React from "react";
import StarRatingComponent from "react-star-rating-component";
import "./Feedback.css";

export default class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      ticketid: "",
      rating: 0,
      message: ""
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({
      rating: nextValue
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    alert("Form submitted");
    console.log("Rating:" + this.state.rating);
  };

  render() {
    const { rating } = this.state;

    return (
      <form
        name="feedbackForm"
        id="feedbackForm"
        onSubmit={this.handleSubmit}
        className="feedbackcss"
      >
        <div className="feedback">
          <p>Enter Ticket Id:</p>
          <input
            type="text"
            name="ticketid"
            value={this.state.ticketid}
            placeholder="Ticket Id"
            onChange={this.handleChange}
            required
          />
          <p>Enter Message:</p>
          <input
            type="text"
            name="message"
            value={this.state.message}
            placeholder="Message"
            onChange={this.handleChange}
            required
          />
          <br />
          {/* <h2>Rating from state: {rating}</h2> */}
          <p>Enter Rating:</p>
          <StarRatingComponent
            name="rating"
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          <br />

          <div className="submission">
            <input
              type="submit"
              name="submit"
              id="submit"
              onClick={e => {
                // event.preventDefault()
                const data = new URLSearchParams();
                for (const pair of new FormData(
                  document.getElementById("feedbackForm")
                )) {
                  data.append(pair[0], pair[1]);
                  console.log(pair[0], pair[1]);
                }
                e.preventDefault();
                fetch("http://localhost:8000/query/insertFeedback", {
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
                      alert("No Feedback submited");
                      this.props.history.push("/addFeedback");
                    } else {
                      // Display json
                      alert("Feedback submitted");
                    }
                  });

                console.log("i am from clodemoadl in feedback");
              }}
            />
          </div>
        </div>
      </form>
    );
  }
}
