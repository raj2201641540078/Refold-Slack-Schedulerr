// File: src/components/MessageForm.tsx

import { useState } from "react";
import api from "../utils/api";
import "../App.css";

const MessageForm = () => {
  const [teamId, setTeamId] = useState("");
  const [channel, setChannel] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (time) {
        // Convert to Date object as local time
        const localDate = new Date(time);

        // Adjust so backend stores exactly what user picked
        const correctedDate = new Date(
          localDate.getTime() - localDate.getTimezoneOffset() * 60000
        );

        const res = await api.post("/schedule", {
          teamId,
          channel,
          message,
          time: correctedDate.toISOString(),
        });
        alert(res.data || "✅ Message scheduled!");
      } else {
        const res = await api.post("/send-message", {
          teamId,
          channel,
          text: message,
        });
        alert(res.data || "✅ Message sent!");
      }

      setTeamId("");
      setChannel("");
      setMessage("");
      setTime("");
    } catch (err: any) {
      console.error(err);
      alert("❌ Failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="scheduled-title">📤 Send Slack Message</h2>

      <label>Team ID</label>
      <input
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        placeholder="Enter your Team ID"
        required
      />

      <label>Channel ID</label>
      <input
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        placeholder="Enter the Channel ID"
        required
      />

      <label>Message</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message here..."
        rows={4}
        required
      />

      <label>Schedule Time (optional)</label>
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button type="submit">📤 Send Message</button>
    </form>
  );
};

export default MessageForm;
