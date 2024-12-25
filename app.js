let port = 3000;
const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/db");
db();
const router = require("./router/auth");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))

app.use("/", router);

app.listen(process.env.PORT || port, function() {
    console.log("APP IS RUNNING ON PORT:", process.env.PORT || port);
});