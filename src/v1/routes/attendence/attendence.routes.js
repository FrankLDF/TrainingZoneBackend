import { Router } from "express";
// import adminMiddleware from "../../../middlewares/adminMidleware.js";
import attendanceController from "../../../controllers/attendances/attendanceController.js";

const route = new Router();

route
  .post("/", attendanceController.attendanceRegister) // * falta agregar midleware de admin y login aqui *
  .get("/", attendanceController.getAllAttendances) // * falta agregar midleware de admin y login aqui *
  .get("/:id", attendanceController.getAttendance); // * falta agregar midleware de admin y login aqui *

export default route;
