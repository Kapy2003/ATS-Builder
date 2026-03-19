import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", contactRoutes);

app.use('/api/resume', resumeRoutes);

app.get("/debug", (req, res) => {
  res.json({ routes: app._router.stack.filter(r => r.route).map(r => r.route.path) });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});