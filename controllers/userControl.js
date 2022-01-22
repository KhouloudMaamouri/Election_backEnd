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
    const id = req.params.id;
    const user = await User.findById(id);
    console.log(user);
    if (user.cinId === req.body.cinId) {
      return res.status(500).send({
        message: "Cin exist",
        success: false,
      });
    }

    const newUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      cinId: req.body.cinId,
      roles: req.body.roles,
    };
    await User.updateOne({ _id: req.params.id }, { $set: newUpdate }).then(
      (data) => {
        if (data) {
          return res.status(201).send({
            message: "user updated",
            success: true,
          });
        }

        // await User.findByIdAndUpdate({ _id: id, newUpdate }).then((data) => {
        //   if (data) {
        //     return res.status(201).send({
        //       message: "user updated",
        //       success: true,
        //     });
        //   }
        // });
      }
    );
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
