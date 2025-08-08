// File: src/App.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import MessageForm from "./components/MessageForm";
import ScheduledMessages from "./components/ScheduledMessages";
import "./App.css"; // Make sure this is imported

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/slack/check-auth")
      .then((res) => setIsConnected(res.data.connected))
      .catch(() => setIsConnected(false));
  }, []);

  const handleConnect = () => {
    window.location.href = "http://localhost:5000/api/slack/oauth";
  };

  return (
    <>
      {/* 🔰 Watermark Background Text */}
      <div className="watermark">Refold Assessment</div>

      <div className="app-container">
        <div className="card">
          <h1>🚀 Slack Connect App</h1>

          {!isConnected ? (
            <button onClick={handleConnect}>
              🔗 Connect to Slack
            </button>
          ) : (
            <>
              <MessageForm />
              <ScheduledMessages />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
