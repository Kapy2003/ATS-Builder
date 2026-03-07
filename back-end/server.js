import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", contactRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});