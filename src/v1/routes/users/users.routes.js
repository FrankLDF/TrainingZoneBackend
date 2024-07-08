import { Router } from "express";
const router = new Router();
import {registerUser} from '../../../controllers/users/usersController.js'


router.post("/", registerUser)

export default router;
