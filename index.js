const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

const dayjs = require("dayjs");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.vivo3.mongodb.net/election_mp2l?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

//Routes
require("./routes/auth")(app, "/api");
require("./routes/vote")(app, "/api");
require("./routes/user")(app, "/api");
server.listen(4002, () => {
  console.log("listening on *:4002");
});
