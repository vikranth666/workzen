import express from "express";
import cors from "cors";

const app = express();

// 1 Define allowed origins
const allowedOrigins = [
  "http://localhost:5173",            // local dev
  "https://workzenapp.vercel.app"     // deployed frontend
];

// 2 Enable CORS globally BEFORE routes
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests (Postman, server)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 3 Handle preflight requests
app.options("*", cors({
  origin: allowedOrigins,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 4 JSON middleware
app.use(express.json());

// 5 Routes
import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

export default app;

