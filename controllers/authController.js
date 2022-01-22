const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup_post = async (req, res) => {
  try {
    const user = await User.findOne({ cinId: req.body.cinId });
    console.log(user);
    if (user) {
      return res.status(500).send({
        message: "Sorry! User exisite",
        success: false,
      });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 12);
    await User.create(req.body);
    return res.status(201).json({
      message: "Your account has been successfully created",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error occurred register" + err,
      success: false,
    });
  }
};

exports.login_post = async (req, res) => {
  try {
    let user = await User.findOne({ cinId: req.body.cinId });
    console.log(user);
    // Test if customer
    if (!user) {
      return res.status(403).send({
        message: "Invalid CIN",
        success: false,
      });
    }
    const checkPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!checkPassword) {
      return res.status(403).send({
        message: "Invalid CIN pass",
        success: false,
      });
    }
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      cin: user.cinId,
      isVoted: user.isVoted,
      totalVote: user.totalVote,
    };
    const token = await jwt.sign(payload, "#rsopMJ78~é", {
      expiresIn: "9990000",
    });
    return res.status(200).send({
      message: "Successful authentication",
      success: true,
      userToken: token,
      user: user,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error occurred authentification user " + err,
      success: false,
    });
  }
};
