// File: src/app.ts

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";
import cron from "node-cron";
import slackRoutes from "./routes/slack.routes";
import { ScheduledMessage } from "./models/ScheduledMessage";
import { SlackUser } from "./models/SlackUser";

// === Load environment variables ===
dotenv.config();

// === Create Express app ===
const app = express();

// === CORS Middleware ===
app.use(cors({
  origin: [
       // your deployed frontend
      "http://localhost:3000" // keep for local testing
    ], // ✅ Allow frontend origin
  credentials: true                // ✅ Allow credentials (cookies, headers)
}));

// === Body parser ===
app.use(express.json());

// === Routes ===
app.use("/api/slack", slackRoutes);

// === Health Check Route ===
app.get("/", (req, res) => {
  res.send("🚀 Slack Connect Backend is running!");
});

// === Start server after MongoDB connection ===
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🌐 Server is running on http://localhost:${PORT}`);
    });

    // === CRON JOB: Send Scheduled Messages Every Minute ===
    cron.schedule("* * * * *", async () => {
      const now = new Date();

      const messages = await ScheduledMessage.find({
        time: { $lte: now },
        sent: false,
      });

      for (const msg of messages) {
        const user = await SlackUser.findOne({ teamId: msg.teamId });
        if (!user) continue;

        try {
          const response = await axios.post(
            "https://slack.com/api/chat.postMessage",
            {
              channel: msg.channel,
              text: msg.message,
            },
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.ok) {
            msg.sent = true;
            await msg.save();
            console.log(`✅ Sent scheduled message to ${msg.channel}`);
          } else {
            console.error("❌ Slack API error:", response.data.error);
          }
        } catch (err: any) {
          console.error("❌ Cron message send failed:", err.response?.data || err.message);
        }
      }
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });
