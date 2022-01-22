module.exports = (app, pathApi) => {
  const voteControl = require("../controllers/voteControl");
  app.patch(
    pathApi + "/vote/:id",

    voteControl.vote_patch
  );
};
