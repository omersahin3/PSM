const { authJwt } = require("../middleware");
const servers = require("../controllers/server.controller");

const serverRouter = require('express').Router();

serverRouter.post("/", servers.create);
serverRouter.get("/", servers.findAll);
serverRouter.get("/published", servers.findAllPublished);
serverRouter.get("/:id", servers.findOne);
serverRouter.put("/:id", servers.update);
serverRouter.delete("/:id", servers.delete);
serverRouter.delete("/", servers.deleteAll);

module.exports = {
  serverRouter
}
  