const express = require("express");
const app = express();
const mysql = require("mysql");
const signInRoute = require("./signin");
const crudRoute = require("./crudQueries");
const customerRoute = require("./customerQueries");

app.use("/signin", signInRoute);
app.use("/crud", crudRoute);
app.use("/query", customerRoute);

app.listen(8000);
