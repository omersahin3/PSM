const { authJwt } = require("../middleware");
const usercontroller = require("../controllers/user.controller");

const userRouter = require('express').Router();

userRouter.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

userRouter.put(
  "/:id", 
  [authJwt.verifyToken, authJwt.isAdmin], 
  usercontroller.update
);
userRouter.get(
  "/:id", 
  [authJwt.verifyToken, authJwt.isAdmin], 
  usercontroller.findOne
);
userRouter.put(
  "/changepass/:id", 
  [authJwt.verifyToken, authJwt.isAdmin], 
  usercontroller.Changepass
);

module.exports = {
  userRouter
}

