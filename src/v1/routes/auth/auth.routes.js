import { Router } from "express";
const router = new Router();
import { getAllClient } from "../../../controllers/users/usersController.js";

router.get("/", (req, res) => {
  res.send("Login");
});

export default router;
