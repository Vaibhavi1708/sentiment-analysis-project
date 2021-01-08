const db = require("../models");

const { checkBlacklist } = require("../utils/blacklist.utils");

const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    gender: req.body.gender,
    contact_no: req.body.contact_no,
    city: req.body.city,
    address: req.body.address,
  })
    .then((user) => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 86400, // 24 hours
      });

      res.cookie("authToken", token, {
        maxAge: 86400,
        httpOnly: true,
      });

      res.status(200).send({
        id: user.id,
        fname: user.fname,
        email: user.email,

        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.logout = async (req, res) => {
  let token = req.headers["x-access-token"];
  try {
    const result = await checkBlacklist.verifyTokenInBlacklist(token);
    console.log(result.status);

    if (result.status == true) {
      await checkBlacklist.addTokenInBlacklist(token, result.val);
      return res.status(200).send({
        message: "Log out successful!",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// checkBlacklist
//   .verifyTokenInBlacklist(token)
//   .then((result) => {
//     if (result.status == true) {
//       checkBlacklist.addTokenInBlacklist(token, result.val);
//       return res.status(200).send({
//         message: "Log out successful!",
//       });
//     }
//   })

//   .catch((err) => {
//     console.log(err);
//   });
