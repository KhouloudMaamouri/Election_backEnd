const User = require("../models/User");
const socketEvents = require("../utils/socket");
exports.vote_patch = async (req, res) => {
  try {
    const user = await User.findOne({ cinId: req.body.cinId });
    if (user.isVoted) {
      return res.status(500).send({
        message: "user has been voted ",
        success: false,
      });
    }
    if (!user.isVoted) {
      const candidate = await User.findById(req.params.id);

      const addVote = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { totalVote: candidate.totalVote + 1 } },
        { new: true }
      );

      const userWithRole = await User.find({
        $or: [{ roles: "Candidature" }],
      });
      //socket fire
      socketEvents.addvote(userWithRole);
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
      message: "Error occurred vote" + err,
      success: false,
    });
  }
};
