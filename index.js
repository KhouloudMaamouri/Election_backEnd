const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 4002;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
  next();
});

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
server.listen(port, () => {
  console.log(`listening  at : ${port} `);
});
//socket
io.on("connection", (socket) => {
  console.log("a user connected");
});

require("./utils/socket")(io);
