import mongoose from "mongoose";

const ScheduledMessageSchema = new mongoose.Schema({
  teamId: { type: String, required: true },
  channel: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, required: true },
  sent: { type: Boolean, default: false },
});

export const ScheduledMessage = mongoose.model("ScheduledMessage", ScheduledMessageSchema);
