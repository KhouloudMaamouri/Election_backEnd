const User = require("../models/User");

exports.listUser_get = async (req, res) => {
  try {
    console.log(req.query.roles);
    if (req.query.roles) {
      const userWithRole = await User.find({
        $or: [{ roles: req.query.roles }],
      });
      return res.status(200).json({
        message: "List of users with filter",
        success: true,
        user: userWithRole,
      });
    } else {
      const user = await User.find();
      return res.status(200).json({
        message: "List of users",
        success: true,
        user: user,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Error list of user" + err,
      success: false,
    });
  }
};
exports.removeUser_delete = async (req, res) => {
  try {
    const user = User.findByIdAndRemove({ _id: req.params.id }).then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }
      if (data) {
        return res.status(200).send({
          message: "Account client has been successfully removed",
          success: true,
        });
      }
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error Removed client" + err,
      success: false,
    });
  }
};

exports.updateUser_patch = async (req, res) => {
  console.log("idd", req.params.id);
  try {
    const userCin = await User.findById(req.params.id);

    const cinSearched = await User.findOne({ cinId: req.body.cinId });

    const newUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      cinId: req.body.cinId,
      roles: req.body.roles,
    };
    if (!userCin) {
      console.log("first =======>");
      return res.status(404).send({
        message: "not found user",
        success: true,
      });
    }

    if (!cinSearched) {
      console.log("here =======>");
      await User.updateOne({ _id: req.params.id }, { $set: newUpdate }).then(
        (data) => {
          if (data) {
            return res.status(201).send({
              message: "user updated",
              success: true,
            });
          }
        }
      );
    }

    if (
      userCin.cinId === cinSearched.cinId &&
      cinSearched._id.toString() === req.params.id
    ) {
      console.log("seconddd =======>");
      await User.updateOne({ _id: req.params.id }, { $set: newUpdate }).then(
        (data) => {
          if (data) {
            return res.status(201).send({
              message: "user updated succecs",
              success: true,
            });
          }
        }
      );
    }
  } catch (err) {
    return res.status(500).send({
      message: "An error occurred updating your profile :" + err,
      success: false,
    });
  }
};

exports.getUserById_get = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    console.log(user);
    if (!user) {
      return res.status(404).send({
        message: "user not found",
        success: false,
      });
    }
    if (user) {
      return res.status(200).send({
        message: "user is here",
        success: false,
        user: user,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Error occurred  get user by id" + err,
      success: false,
    });
  }
};
