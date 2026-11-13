import { Response } from "express";
import pool from "../db/index";
import { AuthRequest } from "../middlewares/auth";

export const getMyStats = async (req: AuthRequest, res: Response) => {
  const user_id = req.user!.id;
  // stats dell'utente
  try {
    const result = await pool.query(
      `SELECT
        -- Ore totali oggi
        COALESCE(SUM(CASE 
          WHEN started_at::date = CURRENT_DATE 
          THEN duration_minutes END), 0) AS minutes_today,

        -- Ore totali questa settimana
        COALESCE(SUM(CASE 
          WHEN started_at >= date_trunc('week', NOW()) 
          THEN duration_minutes END), 0) AS minutes_this_week,

        -- Ore totali questo mese
        COALESCE(SUM(CASE 
          WHEN started_at >= date_trunc('month', NOW()) 
          THEN duration_minutes END), 0) AS minutes_this_month,

        -- Ore totali in assoluto
        COALESCE(SUM(duration_minutes), 0) AS minutes_total

      FROM sessions
      WHERE user_id = $1 AND ended_at IS NOT NULL`,
      [user_id],
    );

    const raw = result.rows[0];

    res.json({
      today: +(raw.minutes_today / 60).toFixed(1),
      this_week: +(raw.minutes_this_week / 60).toFixed(1),
      this_month: +(raw.minutes_this_month / 60).toFixed(1),
      total: +(raw.minutes_total / 60).toFixed(1),
    });
  } catch (err) {
    res.status(500).json({ error: "Errore server" });
  }
};
