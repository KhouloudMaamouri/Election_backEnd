module.exports = (app, pathApi) => {
  const userControl = require("../controllers/userControl");
  app.get(pathApi + "/users", userControl.listUser_get);
  app.delete(pathApi + "/users/:id", userControl.removeUser_delete);
  app.patch(pathApi + "/users/:id", userControl.updateUser_patch);
  app.get(pathApi + "/users/:id", userControl.getUserById_get);
};
