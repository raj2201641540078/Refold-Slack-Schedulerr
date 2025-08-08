import express from "express";
import axios from "axios";
import { startOAuth, handleOAuthCallback } from "../controllers/slack.controller";
import { SlackUser } from "../models/SlackUser";
import { ScheduledMessage } from "../models/ScheduledMessage";

const router = express.Router();

// === OAuth Routes ===
router.get("/oauth", startOAuth);
router.get("/oauth/callback", handleOAuthCallback);

// === Send Message Immediately ===
router.post("/send-message", async (req, res) => {
  const { teamId, channel, text } = req.body;

  // Check if workspace has authorized your app
  const user = await SlackUser.findOne({ teamId });
  if (!user) {
    return res.status(404).send("This workspace is not connected. Please connect via Slack OAuth first.");
  }

  try {
    const result = await axios.post(
      "https://slack.com/api/chat.postMessage",
      { channel, text },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`, // token for THIS workspace
          "Content-Type": "application/json",
        },
      }
    );

    if (!result.data.ok) {
      console.error("Slack API error:", result.data.error);
      return res.status(500).json({ error: result.data.error });
    }

    res.send("✅ Message sent!");
  } catch (err) {
    console.error("❌ Slack message error:");
    res.status(500).send("Failed to send message.");
  }
});


// ✅ === List All Scheduled Messages (sent + pending) ===
router.get("/schedule", async (req, res) => {
  try {
    const messages = await ScheduledMessage.find({}).sort("time"); // ✅ No filter
    res.json(messages);
  } catch (error) {
    res.status(500).send("❌ Failed to fetch messages");
  }
});

// ✅ === Cancel a Scheduled Message ===
router.delete("/schedule/:id", async (req, res) => {
  try {
    await ScheduledMessage.findByIdAndDelete(req.params.id);
    res.send("✅ Message canceled");
  } catch (error) {
    res.status(500).send("❌ Failed to cancel message");
  }
});

// === Check if Slack is connected ===
router.get("/check-auth", async (req, res) => {
  try {
    const { teamId } = req.query;
    if (!teamId) {
      return res.json({ connected: false });
    }

    const user = await SlackUser.findOne({ teamId });
    res.json({ connected: !!user });
  } catch (err) {
    res.status(500).json({ connected: false, error: "Error checking auth" });
  }
});

export default router;
