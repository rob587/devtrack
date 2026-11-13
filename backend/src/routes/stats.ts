import { Router } from "express";
import {
  getMyStats,
  getStatsByProject,
  getStatsByDay,
  getTeamStats,
} from "../controllers/statsController";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate);

router.get("/me", getMyStats);
router.get("/projects", getStatsByProject);
router.get("/days", getStatsByDay);
router.get("/team", getTeamStats);

export default router;
