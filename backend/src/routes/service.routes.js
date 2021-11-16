const { authJwt } = require("../middleware");
const services = require("../controllers/service.controller");

const serviceRouter = require('express').Router();

serviceRouter.post("/", services.create);
serviceRouter.get("/", services.findAll);
serviceRouter.get("/published", services.findAllPublished);
serviceRouter.get("/:id", services.findOne);
serviceRouter.put("/:id", services.update);
serviceRouter.delete("/:id", services.delete);
serviceRouter.delete("/", services.deleteAll);


module.exports = {
    serviceRouter
}
  