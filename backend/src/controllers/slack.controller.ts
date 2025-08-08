import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { SlackUser } from "../models/SlackUser"; // ✅ SlackUser model
import { ScheduledMessage } from "../models/ScheduledMessage"; // ✅ ScheduledMessage model

// Load environment variables
dotenv.config();
const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;
const redirectUri = process.env.SLACK_REDIRECT_URI;

// Debug logs to verify environment variables
console.log("🔐 SLACK_CLIENT_ID:", clientId || "❌ Missing");
console.log("🔐 SLACK_CLIENT_SECRET:", clientSecret ? "✅ Loaded" : "❌ Missing");
console.log("🔗 SLACK_REDIRECT_URI:", redirectUri || "❌ Missing");

if (!clientId || !clientSecret || !redirectUri) {
  console.warn("⚠️ Missing Slack credentials in .env file!");
}

// === Start OAuth: Redirect to Slack ===
export const startOAuth = (req: Request, res: Response) => {
  if (!clientId || !redirectUri) {
    return res.status(500).send("Slack client ID or redirect URI not configured.");
  }

  // Encode redirect URI for safety
  const encodedRedirectUri = encodeURIComponent(redirectUri);

  const slackOAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=chat:write,channels:read,users:read&redirect_uri=${encodedRedirectUri}`;
  
  console.log("🌐 Redirecting to Slack OAuth:", slackOAuthUrl);
  res.redirect(slackOAuthUrl);
};

// === Handle OAuth Callback ===
export const handleOAuthCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).send("Missing authorization code.");
  }

  try {
    const response = await axios.post("https://slack.com/api/oauth.v2.access", null, {
      params: {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      },
    });

    const { access_token, authed_user, team, ok, error } = response.data;

    if (!ok) {
      console.error("❌ Slack OAuth error:", error);
      return res.status(500).send("Slack OAuth failed: " + error);
    }

    // ✅ Save to MongoDB
    await SlackUser.findOneAndUpdate(
      { teamId: team.id },
      {
        teamId: team.id,
        teamName: team.name,
        userId: authed_user.id,
        accessToken: access_token,
        authedUser: authed_user,
      },
      { upsert: true, new: true }
    );

    console.log("✅ Slack Connected for team:", team.id);

    // 🔄 Redirect to frontend with teamId
    const frontendUrl = process.env.REACT_APP_FRONTEND_BASE_URL || "http://localhost:3000";
    res.redirect(`${frontendUrl}?teamId=${team.id}`);
  } catch (err: any) {
    console.error("❌ Slack OAuth exception:", err.response?.data || err.message);
    res.status(500).send("OAuth failed");
  }
};

// === Get All Scheduled Messages (Sent + Pending) ===
export const getScheduledMessages = async (req: Request, res: Response) => {
  try {
    const messages = await ScheduledMessage.find({}).sort({ time: 1 }); // ✅ Sort by time
    res.json(messages);
  } catch (error) {
    console.error("❌ Failed to fetch scheduled messages:", error);
    res.status(500).json({ error: "Failed to fetch scheduled messages" });
  }
};
