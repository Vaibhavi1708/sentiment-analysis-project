const jwt = require("jsonwebtoken");

const { checkBlacklist } = require("../utils/blacklist.utils");
const { unauthorized } = require('../utils/error');

const db = require("../models");
const User = db.user;

verifyToken = async (req, res, next) => {
  let token = req.cookies["authToken"];

  try {
    if (!token) {
      return res.status(403).send({
        message: unauthorized(),
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
        message: unauthorized(),
      });
    }
  } catch (err) {}
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
