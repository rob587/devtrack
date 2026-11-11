import { Router } from "express";
import {
  createProject,
  getMyProjects,
  addMember,
} from "../controllers/projectController";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate); // tutte le route qui sotto richiedono il token

router.post("/", createProject);
router.get("/mine", getMyProjects);
router.post("/members", addMember);

export default router;
