// File: src/components/MessageForm.tsx

import { useState } from "react";
import api from "../utils/api";
import "../App.css"; // Ensure global styles apply

const MessageForm = () => {
  const [teamId, setTeamId] = useState("");
  const [channel, setChannel] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (time) {
        // Parse the datetime-local string (YYYY-MM-DDTHH:MM) into local Date
        const [datePart, timePart] = time.split("T");
        const [year, month, day] = datePart.split("-").map((n) => Number(n));
        const [hour, minute] = timePart.split(":").map((n) => Number(n));

        // Construct a Date using local timezone (monthIndex = month - 1)
        const localDate = new Date(year, month - 1, day, hour, minute, 0, 0);

        // Validate
        if (isNaN(localDate.getTime())) {
          throw new Error("Invalid date");
        }

        // Send the exact local time as an ISO string (backend will get the correct instant)
        const res = await api.post("/schedule", {
          teamId,
          channel,
          message,
          time: localDate.toISOString(),
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
