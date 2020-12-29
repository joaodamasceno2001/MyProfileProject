const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");
const userController = require("./controllers/UserController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post("/users", userController.create);
routes.post("/login", userController.login);
routes.get("/users", userController.index);
routes.put("/users/:id", upload.single("image"), userController.upload);
routes.get("/names/:name", userController.list);

module.exports = routes;
