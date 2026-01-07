import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

const app = express();
app.use(cors({
  origin: "https://workzenapp.vercel.app/",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

export default app;
