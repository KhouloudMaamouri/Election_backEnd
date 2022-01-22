module.exports = (app, pathApi) => {
  const voteControl = require("../controllers/voteControl");
  app.post(
    pathApi + "/vote/:id",

    voteControl.vote_patch
  );
};
