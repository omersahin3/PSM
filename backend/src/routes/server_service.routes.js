const { authJwt } = require("../middleware");
const serverServiceController = require("../controllers/server_service.controller");

const serverServiceRouter = require('express').Router();

serverServiceRouter.get("/", [authJwt.verifyToken, authJwt.isAdmin], serverServiceController.findAll);
serverServiceRouter.get("/dashboard/", [authJwt.verifyToken, authJwt.isAdmin], serverServiceController.dashboard);

module.exports = {
  serverServiceRouter
}
  