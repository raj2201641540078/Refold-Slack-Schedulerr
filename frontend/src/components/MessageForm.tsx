// File: src/components/MessageForm.tsx

import { useState } from "react";
import api from "../utils/api";
import "../App.css"; // Ensure global styles apply

interface MessageFormProps {
  teamId: string | null;
}

const MessageForm: React.FC<MessageFormProps> = ({ teamId }) => {
  const [channel, setChannel] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (time) {
        const [datePart, timePart] = time.split("T");
        const [year, month, day] = datePart.split("-").map((n) => Number(n));
        const [hour, minute] = timePart.split(":").map((n) => Number(n));

        const localDate = new Date(year, month - 1, day, hour, minute, 0, 0);

        if (isNaN(localDate.getTime())) {
          throw new Error("Invalid date");
        }

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
