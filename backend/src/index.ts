import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import projectRoutes from "./routes/projects";
import sessionRoutes from "./routes/session";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Devtrack è avviato" });
});

app.listen(PORT, () => {
  console.log(`Server aperto nella porta: ${PORT}`);
});
