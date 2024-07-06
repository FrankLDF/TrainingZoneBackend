import { Router } from "express";
const router = new Router();
import { getAllClient } from "../../../controllers/users/usersController.js";

router.get("/", getAllClient);

export default router;
