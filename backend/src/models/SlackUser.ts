import mongoose from "mongoose";

const SlackUserSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true },
  teamName: String,
  userId: String,
  accessToken: String,
  authedUser: mongoose.Schema.Types.Mixed,
});

export const SlackUser = mongoose.model("SlackUser", SlackUserSchema);
