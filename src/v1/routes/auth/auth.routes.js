import { Router } from "express";
import { loginUser, logoutUser } from "../../../controllers/auth/authControllers.js"
import authMiddleware from "../../../middlewares/authMidleware.js";
const router = new Router();


router.post("/login", loginUser);

router.post("/logout", authMiddleware, logoutUser);

export default router;
