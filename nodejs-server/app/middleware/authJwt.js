const jwt = require("jsonwebtoken");

const { checkBlacklist } = require("../utils/blacklist.utils");

const db = require("../models");
const User = db.user;

verifyToken = async (req, res, next) => {
  let token = req.cookies["authToken"];

  try {
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: err.message,
        });
      }

      req.userId = decoded.id;
    });

    const result = await checkBlacklist.verifyTokenInBlacklist(token);

    if (result.status === true) {
      next();
    } else {
      return res.status(401).send({
        message: "Please log in again!",
      });
    }
  } catch (err) {}
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
