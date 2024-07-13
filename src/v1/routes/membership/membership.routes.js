import { Router } from "express";
import membershipsController from "../../../controllers/memberships/membershipsController.js";

const route = new Router();

route
    .post("/", membershipsController.registerMembership)  // agregar midleware de validateAdmin
    .get("/:id", membershipsController.getUserMembership)
    

export default route