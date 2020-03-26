const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
//router.use(bodyParser.json('application/json;charset=UTF-8'))

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vijayendra1305",
  database: "Bus_Enquiry"
});

connection.connect(err => {
  if (err) {
    console.log("Server refused to connect.");
    console.log(err);
  } else {
    console.log("Connected to Server");
  }
});

router.post("/displayBus", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.body);
  // let sql = `with route_id(rid) as
  //   (select routeID from Route
  //     where origin = ?, destination = ?)
  //     select * from Bus natural join route_id;`;
  let sql =
    "select * from Bus natural join Route where Route.origin = " +
    "'" +
    req.body.origin +
    "'" +
    " and Route.destination = " +
    "'" +
    req.body.destination +
    "'";
  let data = [req.body.origin, req.body.destination];
  connection.query(sql, function(err, result, fields) {
    if (err) {
      console.log("Error searching records");
      console.log(err);
    } else {
      console.log("Buses Identified");
      console.log(result);
      if (result.length == 0) {
        res.send({ password: null });
      } else {
        res.send(result);
      }
    }
  });
});

router.post("/ticketSeats", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.body);

  let sql =
    "select seatno from ticket natural join seats where ticketid=" +
    "'" +
    req.body.ticketno +
    "'";
  connection.query(sql, function(err, result, fields) {
    if (err) {
      console.log("Error searching records");
      console.log(err);
    } else {
      console.log("Seats Identified");
      console.log(result);
      res.send(result);
    }
  });
});

router.post("/displayTicket", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.body);

  let sql =
    "select ticketid,timestamp,DOJ,busid,busname,origin,destination,arrivaltime,departuretime,ac,TIMEDIFF(arrivaltime,departuretime) as journeytime from ticket natural join bus natural join route where ticket.ticketid=" +
    "'" +
    req.body.ticketno +
    "'";
  connection.query(sql, function(err, result, fields) {
    if (err) {
      console.log("Error searching records");
      console.log(err);
    } else {
      console.log("Ticket Identified");
      console.log(result);
      //console.log("Ticket & Seats : " + );
      if (result.length == 0) {
        res.send({ password: null });
      } else {
        console.log(result);
        res.send(result);
      }
    }
  });
});

router.post("/insertBus", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.body);

  let AC = "";
  if (req.body.ac === "on") {
    AC = "AC";
  } else {
    AC = "Non AC";
  }

  var sql =
    "INSERT INTO bus VALUES ('" +
    req.body.busid +
    "','" +
    req.body.busname +
    "','" +
    req.body.busfare +
    "','" +
    req.body.arrivaltime +
    "','" +
    req.body.departuretime +
    "','" +
    AC +
    "','" +
    req.body.bustype +
    "','" +
    req.body.seatsavailable +
    "','" +
    req.body.routeid +
    "')";

  connection.query(sql, function(err, result, fields) {
    if (err) {
      console.log("Error inserting records");
      console.log(err);
      res.send(err);
      res.end();
    } else {
      console.log("Bus inserted in Bus table.");
    }
  });
});

router.post("/insertTicket", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.body);

  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  var timestamp = `${hours}:${min}:${sec}`;

  var sql1 =
    "INSERT INTO ticket VALUES ('" +
    req.body.ticketid +
    "','" +
    timestamp +
    "','" +
    req.body.doj +
    "','" +
    req.body.busid +
    "','" +
    req.body.username +
    "')";

  connection.query(sql1, function(err, result, fields) {
    if (err) {
      console.log("Error inserting records");
      console.log(err);
      res.send(err);
      res.end();
    } else {
      console.log("Ticket inserted in Ticket table");
    }
  });

  if (req.body.seat1 !== "") {
    var sql2 =
      "INSERT INTO seats VALUES ('" +
      req.body.ticketid +
      "','" +
      req.body.seat1 +
      "')";

    connection.query(sql2, function(err, result, fields) {
      if (err) {
        console.log("Error inserting records");
        console.log(err);
        res.send(err);
        res.end();
      } else {
        console.log("Ticket inserted in Seats table");
      }
    });
  }
  if (req.body.seat2 !== "") {
    var sql3 =
      "INSERT INTO seats VALUES ('" +
      req.body.ticketid +
      "','" +
      req.body.seat2 +
      "')";

    connection.query(sql3, function(err, result, fields) {
      if (err) {
        console.log("Error inserting records");
        console.log(err);
        res.send(err);
        res.end();
      } else {
        console.log("Ticket inserted in Seats table");
      }
    });
  }
  if (req.body.seat3 !== "") {
    var sql4 =
      "INSERT INTO seats VALUES ('" +
      req.body.ticketid +
      "','" +
      req.body.seat3 +
      "')";

    connection.query(sql4, function(err, result, fields) {
      if (err) {
        console.log("Error inserting records");
        console.log(err);
        res.send(err);
        res.end();
      } else {
        console.log("Ticket inserted in Seats table");
      }
    });
  }
});

router.post("/insertRoute", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.body);

  var sql =
    "INSERT INTO route VALUES ('" +
    req.body.routeid +
    "','" +
    req.body.origin +
    "','" +
    req.body.destination +
    "')";

  connection.query(sql, function(err, result, fields) {
    if (err) {
      console.log("Error inserting records");
      console.log(err);
      res.send(err);
      res.end();
    } else {
      console.log("Route inserted in Route table");
    }
  });
});

router.post("/insertFeedback", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.body);

  var fid = Math.floor(Math.random() * 100 + 1);

  var sql =
    "INSERT INTO feedback VALUES ('" +
    fid +
    "','" +
    req.body.ticketid +
    "','" +
    req.body.message +
    "','" +
    req.body.rating +
    "')";

  connection.query(sql, function(err, result, fields) {
    if (err) {
      console.log("Error inserting records");
      console.log(err);
      res.send(err);
      res.end();
    } else {
      console.log("Route inserted in Route table");
    }
  });
});

router.post("/getFeedback", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.body);

  var sql = `SELECT message from feedback natural join ticket where busid = ?`;

  connection.query(sql, [req.body.busid], function(err, result, fields) {
    if (err) {
      console.log("Error fecthing records");
      console.log(err);
      res.send(err);
      res.end();
    } else {
      console.log("Feedback Fetched");
      console.log(result);
      //console.log("Ticket & Seats : " + );
      if (result.length == 0) {
        res.send({ feedback: null });
      } else {
        res.send(result);
      }
    }
  });
});

module.exports = router;
