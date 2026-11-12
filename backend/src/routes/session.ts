import { Router } from "express";
import {
  startSession,
  stopSession,
  getMySessions,
  getTeamSessions,
} from "../controllers/sessionController";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate);

router.post("/start", startSession);
router.patch("/stop", stopSession);
router.get("/mine", getMySessions);
router.get("/team", getTeamSessions);

export default router;
