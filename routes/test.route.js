import express from "express";
import { showBeAdmin, showBeLoggedIn } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();
router.post("/should-be-logged-in",verifyToken,showBeLoggedIn)
router.post("/should-be-admin",showBeAdmin)
export default router;