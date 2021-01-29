const db = require('../models');
const { userNotFound, successful, invalidPassword } = require('../utils/error')
const { checkBlacklist } = require('../utils/blacklist.utils');

const User = db.user;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    // Save User to Database
    const user = await User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      gender: req.body.gender,
      contact_no: req.body.contact_no,
      city: req.body.city,
      address: req.body.address,
    });
    return res
      .status(200)
      .send({ message: successful("Registeration") });
  } catch (err) {}
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(404).send({ message: userNotFound(req.body.email) });
    }

    const passwordIsValid = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: invalidPassword(),
      });
    }

    let token = await jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    await res.cookie('authToken', token, {
      maxAge: 86400,
      httpOnly: true,
    });
    return res.status(200).send({
      id: user.id,
      fname: user.fname,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  let token = req.cookies['authToken'];
  try {
    const result = await checkBlacklist.verifyTokenInBlacklist(token);

    if (result.status === true) {
      await checkBlacklist.addTokenInBlacklist(token, result.val);
      return res.status(200).send({
        message: successful("Logout"),
      });
    }
  } catch (err) {}
};

exports.isLoggedIn = async (req, res) => {
  try {
    res.status(200).send(true);
  } catch (err) {}
};
