const { authJwt } = require("../middleware");
const services = require("../controllers/service.controller");

const serviceRouter = require("express").Router();

serviceRouter.post("/", [authJwt.verifyToken, authJwt.isAdmin], services.create);
serviceRouter.get("/", [authJwt.verifyToken, authJwt.isAdmin], services.findAll);
serviceRouter.get("/published", [authJwt.verifyToken, authJwt.isAdmin], services.findAllPublished);
serviceRouter.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], services.findOne);
serviceRouter.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], services.update);
serviceRouter.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], services.delete);
serviceRouter.delete("/", [authJwt.verifyToken, authJwt.isAdmin], services.deleteAll);

module.exports = {
  serviceRouter,
};
