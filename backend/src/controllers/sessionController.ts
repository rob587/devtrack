import { Response } from "express";
import pool from "../db/index";
import { AuthRequest } from "../middlewares/auth";

export const startSession = async (req: AuthRequest, res: Response) => {
  const { project_id, description } = req.body;
  const user_id = req.user!.id;

  try {
    const active = await pool.query(
      "SELECT id FROM sessions WHERE user_id = $1 AND ended_at IS NULL",
      [user_id],
    );

    if (active.rows.length > 0) {
      res
        .status(400)
        .json({ error: "Hai già una sessione attiva, stoppala prima" });
      return;
    }

    const member = await pool.query(
      "SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2",
      [project_id, user_id],
    );

    if (member.rows.length === 0) {
      res.status(403).json({ error: "Non sei membro di questo progetto" });
      return;
    }

    const result = await pool.query(
      "INSERT INTO sessions (user_id, project_id, description, started_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [user_id, project_id, description],
    );

    res.status(201).json({ session: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};
