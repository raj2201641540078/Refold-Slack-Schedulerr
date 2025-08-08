import { useEffect, useState } from "react";
import axios from "axios";
import MessageForm from "./components/MessageForm";
import ScheduledMessages from "./components/ScheduledMessages";
import "./App.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/slack";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
  axios
    .get(`${API_BASE_URL}/check-auth`)
    .then((res) => setIsConnected(res.data.connected))
    .catch(() => setIsConnected(false));
}, [window.location.search]);

  const handleConnect = () => {
    window.location.href = `${API_BASE_URL}/oauth`;
  };

  return (
    <>
      <div className="watermark">Refold Assessment</div>

      <div className="app-container">
        <div className="card">
          <h1>🚀 Slack Connect App</h1>

          {!isConnected ? (
            <button onClick={handleConnect}>🔗 Connect to Slack</button>
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
