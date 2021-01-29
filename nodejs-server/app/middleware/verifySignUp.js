const db = require("../models");
const { emailAlreadyExist } = require('../utils/error');
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(409).send({
        message: emailAlreadyExist(),
      });
      return;
    }

    next();
  });
};
const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;
