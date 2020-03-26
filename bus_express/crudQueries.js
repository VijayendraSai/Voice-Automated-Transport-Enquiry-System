const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

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

router.get("/create/:id/:name/:email/:phone", (req, res) => {
  var sql =
    "INSERT INTO customer VALUES ('" +
    req.params.id +
    "','" +
    req.params.name +
    "','" +
    req.params.email +
    "', '" +
    req.params.phone +
    "')";
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("Error inserting records");
      console.log(err);
    } else {
      console.log("1 record inserted");
    }
  });
  res.end();
});

router.post("/create", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  console.log("requested");
  console.log(req.body);
  var id = Math.floor(Math.random() * 10000000 + 1);

  var sql =
    "INSERT INTO Person VALUES ('" +
    id +
    "','" +
    req.body.firstname +
    "','" +
    req.body.lastname +
    "','" +
    req.body.email +
    "','" +
    req.body.username +
    "','" +
    req.body.password +
    "','" +
    req.body.phone +
    "')";

  connection.query(sql, function(err, result) {
    if (err) {
      console.log("Error inserting records");
      console.log(err);
      res.send(err);
      res.end();
    } else {
      console.log("Customer Info inserted in Person table.");
    }
  });

  var sql =
    "select * from Person where customer.username ='" + req.body.username + "'";
  connection.query(sql, function(err, result, fields) {
    if (err) {
      console.log("Error searching records");
      console.log(err);
    } else {
      console.log("Customer Identified");
      console.log(result);
      res.send(result[0]);
    }
    res.end();
  });
});

module.exports = router;
