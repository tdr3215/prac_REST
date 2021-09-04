"use strict";
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
uuid();
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));

app.use(express.json()); //json payloads
app.use(express.urlencoded({ extended: true })); //url payloads
app.use(methodOverride("_method"));

// Array of Tweets/Objects

let tweets = [
  {
    id: uuid(),
    username: "tdr3215",
    comment: "omg he is beautiful",
    img: "bts.jpeg",
  },
  {
    id: uuid(),
    username: "scarymonkey92",
    comment: "They're soo pretty",
    img: "blackpink.jpeg",
  },
  {
    id: uuid(),
    username: "staycgirl69",
    comment: "comeback???!?!?",
    img: "monstax.jpeg",
  },
  {
    id: uuid(),
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
  tweets.push({ username, comment, img, id: uuid() });
  res.redirect("/tweet");
});

// SHOW POST

app.get("/tweet/:id", (req, res) => {
  const { id } = req.params;
  const tweet = tweets.find((t) => t.id === id);
  res.render("tweets/show", { tweet });
});

// PATCH POST

app.patch("/tweet/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = tweets.find((t) => t.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/tweet");
});

app.get("/tweet/:id/edit", (req, res) => {
  const { id } = req.params;
  const tweet = tweets.find((t) => t.id === id);
  res.render("tweets/edit", { tweet });
});

// DELETE POST

app.delete("/tweet/:id", (req, res) => {
  const { id } = req.params;
  tweets = tweets.filter((t) => t.id !== id);
  res.redirect("/tweet");
});

app.listen("8080", () => {
  console.log("LISTENING ON PORT 8080");
});
