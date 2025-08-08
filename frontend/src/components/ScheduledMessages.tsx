// File: src/components/ScheduledMessages.tsx

import { useEffect, useState } from "react";
import api from "../utils/api";
import { ScheduledMessage } from "../types";
import "../App.css"; // Ensure global styles apply

interface ScheduledMessagesProps {
  teamId: string | null;
}

const ScheduledMessages = ({ teamId }: ScheduledMessagesProps) => {
  const [messages, setMessages] = useState<ScheduledMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/schedule", {
        params: { teamId }, // Pass teamId to backend if required
      });

      const sorted = res.data.sort(
        (a: ScheduledMessage, b: ScheduledMessage) =>
          new Date(a.time).getTime() - new Date(b.time).getTime()
      );
      setMessages(sorted);
    } catch (err: any) {
      console.error("❌ Failed to fetch scheduled messages:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelMessage = async (id: string) => {
    try {
      await api.delete(`/schedule/${id}`, {
        params: { teamId }, // Pass teamId for correct workspace
      });
      await fetchMessages();
      alert("✅ Message canceled!");
    } catch (err: any) {
      console.error("❌ Failed to cancel:", err.message);
      alert("❌ Failed to cancel message");
    }
  };

  useEffect(() => {
    if (teamId) {
      fetchMessages();
    }
  }, [teamId]);

  return (
    <div>
      <h2 className="scheduled-title">🗓️ Scheduled Messages</h2>

      {loading ? (
        <p className="scheduled-empty">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="scheduled-empty">No scheduled messages</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {messages.map((msg) => (
            <li
              key={msg._id}
              style={{
                border: "2px solid #6a0dad",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                background: "#ffffffdd",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              }}
            >
              <p>
                <strong>📺 Channel:</strong> {msg.channel}
              </p>
              <p>
                <strong>💬 Message:</strong> {msg.message}
              </p>
              <p>
                <strong>⏰ Time:</strong>{" "}
                {new Date(msg.time).toLocaleString()}
              </p>
              <p>
                <strong>📦 Status:</strong>{" "}
                {msg.sent ? "✅ Sent" : "🕒 Pending"}
              </p>

              {!msg.sent && (
                <button
                  onClick={() => cancelMessage(msg._id)}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#c82333";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#dc3545";
                  }}
                >
                  ❌ Cancel
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScheduledMessages;
