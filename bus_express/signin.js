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

router.post("/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  var username = req.body.username;
  var password = req.body.password;
  console.log("request body" + req.body.name);
  var sql =
    "select * from Person where Person.Username = " +
    "'" +
    username +
    "'" +
    " and  Person.Password = " +
    "'" +
    password +
    "'";
  connection.query(sql, function(err, result, fields) {
    if (err) {
      console.log("Error searching records");
      console.log(err);
    } else {
      console.log("Customer Identified");
      //console.log(result)
      if (result.length == 0) {
        res.send({ password: null });
      } else {
        res.send(result[0]);
      }
    }
  });
});

router.post("/products", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log("Requested");
  var sql = "select * from electronics;";
  connection.query(sql, function(err, result, fields) {
    if (err) {
      console.log("Error searching records");
      console.log(err);
    } else {
      console.log("Customer Identified");
      //console.log(result)
      if (result.length == 0) {
        res.send({ password: null });
      } else {
        res.send(result);
      }
    }
  });
});

module.exports = router;
