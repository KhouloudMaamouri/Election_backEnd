const User = require("../models/User");

exports.vote_patch = async (req, res) => {
  try {
    const user = await User.findOne({ cinId: req.body.cinId });
    if (user.isVoted) {
      return res.status(200).send({
        message: "user voted done",
        success: false,
      });
    }
    if (!user.isVoted) {
      const addVote = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { totalVote: totalVote + 1 } }
      );
      const elector = await User.findOneAndUpdate(
        { cinId: req.body.cinId },
        { isVoted: true }
      );
      return res.status(201).send({
        message: "Vote accepted",
        success: true,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Error occurred register" + err,
      success: false,
    });
  }
};
