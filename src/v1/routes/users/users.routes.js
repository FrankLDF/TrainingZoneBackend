import { Router } from "express";
const router = new Router();

import adminMiddleware from "../../../middlewares/adminMidleware.js"
import {registerUser, getUsers} from '../../../controllers/users/usersController.js'


router
  .post("/", adminMiddleware, registerUser)
  .get("/", adminMiddleware, getUsers);

export default router;
