module.exports = (app, pathApi) => {
  const userControl = require("../controllers/authController");
  app.post(
    pathApi + "/signup",

    userControl.signup_post
  );
  app.post(
    pathApi + "/login",

    userControl.login_post
  );
};
