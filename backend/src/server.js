import express from "express";
import { setServers } from "dns/promises";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

setServers(["0.0.0.0", "1.1.1.1", "8.8.8.8"]);

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port:", PORT);
    });
});