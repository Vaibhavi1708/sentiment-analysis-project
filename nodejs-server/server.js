const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize.sync();

const authJwt = require("./app/middleware");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// simple route
app.use("*", (req, res, next) => {
  if (
    !req.originalUrl.endsWith("/signup") &&
    !req.originalUrl.endsWith("/login") &&
    req.originalUrl.startsWith("/api")
  )
    authJwt.verifyToken(req, res, next);
  else return next();
});

require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});