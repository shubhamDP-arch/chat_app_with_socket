import express from "express";

import { allUsers, authUser, registerUser } from "../controllers/user.controllers.js";

const router = express.Router()

router.route("/").get(allUsers);
router.route("/").post(registerUser);
router.route("/login").post(authUser)

export default router;