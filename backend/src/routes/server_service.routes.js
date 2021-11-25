const { authJwt } = require("../middleware");
const serverServiceController = require("../controllers/server_service.controller");

const serverServiceRouter = require('express').Router();

serverServiceRouter.get("/", [authJwt.verifyToken, authJwt.isAdmin], serverServiceController.findAll);

module.exports = {
  serverServiceRouter
}
  