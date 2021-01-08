const jwt = require("jsonwebtoken");

const { checkBlacklist } = require("../utils/blacklist.utils");

const db = require("../models");
const User = db.user;

verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  try {
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }

      req.userId = decoded.id;
    });

    const result = await checkBlacklist.verifyTokenInBlacklist(token);

    if (result.status == true) {
      next();

      return "You can proceed!";
    } else {
      next();
      return res.status(401).send({
        message: "Please log in again!",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
