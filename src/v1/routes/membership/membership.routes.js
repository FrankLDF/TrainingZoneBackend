import { Router } from "express";
import adminMiddleware from "../../../middlewares/adminMidleware.js";

import membershipsController from "../../../controllers/memberships/membershipsController.js";

const route = new Router();

route
  .post("/", adminMiddleware, membershipsController.registerMembership) // agregar midleware de validateAdmin
  .get("/:id", adminMiddleware, membershipsController.getUserMembership);
    

export default route