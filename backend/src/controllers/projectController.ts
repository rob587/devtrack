import { Response } from "express";
import pool from "../db/index";
import { AuthRequest } from "../middlewares/auth";

// Crea un nuovo progetto
export const createProject = async (req: AuthRequest, res: Response) => {
  const { name, description } = req.body;
  const owner_id = req.user!.id;

  try {
    const result = await pool.query(
      "INSERT INTO projects (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *",
      [name, description, owner_id],
    );

    const project = result.rows[0];

    // Aggiunge automaticamente il creatore come membro
    await pool.query(
      "INSERT INTO project_members (project_id, user_id) VALUES ($1, $2)",
      [project.id, owner_id],
    );

    res.status(201).json({ project });
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};

// Recupera i progetti dell'utente loggato
export const getMyProjects = async (req: AuthRequest, res: Response) => {
  const user_id = req.user!.id;

  try {
    const result = await pool.query(
      `SELECT p.* FROM projects p
       JOIN project_members pm ON pm.project_id = p.id
       WHERE pm.user_id = $1
       ORDER BY p.created_at DESC`,
      [user_id],
    );

    res.json({ projects: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};

export const addMember = async (req: AuthRequest, res: Response) => {
  const { project_id, user_id } = req.body;
  const requester_id = req.user!.id;

  try {
    const project = await pool.query(
      "SELECT id FROM projects WHERE id = $1 AND owner_id = $2",
      [project_id, requester_id],
    );

    if (project.rows.length === 0) {
      res.status(403).json({ error: "Non autorizzato" });
      return;
    }

    await pool.query(
      "INSERT INTO project_members (project_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [project_id, user_id],
    );

    res.json({ message: "Membro aggiunto" });
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};
