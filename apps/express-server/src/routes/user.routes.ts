import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { HealthCheck, Server, UserProfile, UserSignIn, UserSignUp } from "../controllers/user.controller";

const router = Router();

router.post("/signup", UserSignUp);
router.post("/signin", UserSignIn);
router.get("/health", HealthCheck);
router.get("/me", jwtAuth, UserProfile);
router.get("/",Server);

export default router;