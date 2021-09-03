"use strict";
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const { v4: uuid } = require("uuid");

uuid();
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));

app.use(express.json()); //json payloads
app.use(express.urlencoded({ extended: true })); //url payloads
// app.use(methodOverride("_method"));

// Array of Tweets/Objects

let tweets = [
  {
    id: 131232,
    username: "tdr3215",
    comment: "omg he is beautiful",
    img: "bts.jpeg",
  },
  {
    id: 1233122,
    username: "scarymonkey92",
    comment: "They're soo pretty",
    img: "blackpink.jpeg",
  },
  {
    id: 646546,
    username: "staycgirl69",
    comment: "comeback???!?!?",
    img: "monstax.jpeg",
  },
  {
    id: 98867,
    username: "nexlvl83",
    comment: "3rd guy from the left is foine!",
    img: "seventeen.jpeg",
  },
];

app.get("/tweet", (req, res) => {
  res.render("tweets/home", { tweets });
});

// CREATE NEW POST

app.get("/tweet/new", (req, res) => {
  res.render("tweets/new");
});

app.post("/tweet", (req, res) => {
  const { username, comment, img } = req.body;
  tweets.push({ username, comment, img, id: 234567 });
  res.redirect("/tweet");
  console.log(img);
});

// SHOW POST

app.get("/tweet/:id", (req, res) => {
  const { id } = req.params;
  const tweet = tweets.find((t) => t.id === id);
  res.render("tweets/show", { tweet });
});

// app.get("/tweet/:id", (req, res) => {
//   const { id } = req.params; //params is equal to the id in the url
//   const tweeter = tweets.find((t) => {
//     t.id === id;
//   });
//   res.render("tweets/show", { tweeter });
// });

app.listen("8080", () => {
  console.log("LISTENING ON PORT 8080");
});
