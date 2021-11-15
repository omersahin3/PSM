const { verifySignUp } = require("../middleware");
const authcontroller = require("../controllers/auth.controller");

const authRouter = require('express').Router();

authRouter.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

authRouter.post("/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
    authcontroller.signup
);

authRouter.post("/signin", authcontroller.signin);

module.exports = {
    authRouter
}