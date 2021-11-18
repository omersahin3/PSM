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

userRouter.get("/all", usercontroller.allAccess);

userRouter.get(
  "/user",
  [authJwt.verifyToken],
  usercontroller.userBoard
);

userRouter.get(
  "/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  usercontroller.moderatorBoard
);

userRouter.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  usercontroller.adminBoard
);

userRouter.put("/:id", usercontroller.update);
userRouter.get("/:id", usercontroller.findOne);
userRouter.put("/changepass/:id", usercontroller.Changepass);

module.exports = {
  userRouter
}

