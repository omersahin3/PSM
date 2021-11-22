const { authJwt } = require("../middleware");
const servers = require("../controllers/server.controller");

const serverRouter = require('express').Router();

serverRouter.post("/", [authJwt.verifyToken, authJwt.isAdmin], servers.create);
serverRouter.get("/", [authJwt.verifyToken, authJwt.isAdmin], servers.findAll);
serverRouter.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], servers.findOne);
serverRouter.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], servers.update);
serverRouter.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], servers.delete);
serverRouter.delete("/", [authJwt.verifyToken, authJwt.isAdmin], servers.deleteAll);

module.exports = {
  serverRouter
}
  