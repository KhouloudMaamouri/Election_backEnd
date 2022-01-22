module.exports = (io) => {
  module.exports.addvote = (data) => {
    return io.emit("add-vote", data);
  };
};
