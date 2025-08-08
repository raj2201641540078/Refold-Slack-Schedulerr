
``` bash

## Important

Respected Sir/Madam, I have made the website and deployed also but it is working only for one specific team and channel id which is mine.  
I am sorry not provided the exact website as expected from the assessment but here is my teamid: **T09987TJ8CU**  
and channel id: **C099SEPBC9F**, and **refoldapp.slack.com** this is my Slack workspace, if you can then please test my website.  
Thank you.  
Deployed link: **https://refold-slack-schedulerr.vercel.app/**  



```


<h1 align="center">🕒 Refold Slack Scheduler</h1>

## 🧾 Problem Statement

Build a web app that allows a user to:

| Feature                       | Description                                                                 |
|------------------------------|-----------------------------------------------------------------------------|
| 🔐 **OAuth Integration**       | Connect your Slack workspace using secure Slack OAuth 2.0 authentication     |
| 📆 **Schedule Messages**       | Set messages to be delivered at a specific time in selected channels         |
| 📋 **View Scheduled**          | View all upcoming scheduled messages in a clean UI                          |
| ❌ **Cancel Messages**         | Cancel a scheduled message before it’s sent                                 |
| ⚡ **Instant Send**            | Send messages immediately to Slack channels                                 |
| 🔁 **Message Persistence**     | Scheduled messages remain even after page reload                            |
| 🔄 **Token Refresh**           | Auto-refresh Slack access tokens when they expire                           |
| 🗃️ **MongoDB Storage**         | All user data and messages are stored in MongoDB using Mongoose             |

## 🛠 Tech Stack

| Layer       | Technologies                                           |
|-------------|--------------------------------------------------------|
| 🎨 Frontend | React, TypeScript, Tailwind CSS, Axios                |
| 🧠 Backend  | Node.js, Express.js, TypeScript                        |
| 🗃️ Database | MongoDB, Mongoose                                     |
| 🔐 Auth     | Slack OAuth 2.0                                       |
| 🧪 Tools    | Ngrok (for local tunneling), Vite, GitHub             |

## ⚙️ Getting Started (Local Setup)

Kindly follow the steps below to seamlessly set up and run the application on your local environment.
---

### 📁 1. Clone the Repository

```bash
git clone https://github.com/raj2201641540078/refold-slack-scheduler.git
cd refold-slack-scheduler
```
🔧 2. Backend Setup
```bash
cd backend
npm install
```
📝 Create a .env file in the backend/ folder using the provided .env.example:
```bash
PORT=5000
SLACK_CLIENT_ID=your-client-id
SLACK_CLIENT_SECRET=your-client-secret
SLACK_REDIRECT_URI=https://your-ngrok-url/api/slack/oauth/callback
MONGO_URI=your-mongodb-uri
```
🚀 Start the backend server:
```bash
   npm run dev
```
🌐 3. Frontend Setup
```bash
cd ../frontend
npm install
```
📝 Create a .env file in the frontend/ folder using the provided .env.example:
```bash
REACT_APP_API_BASE_URL=http://localhost:5000/api/slack
```
Start the frontend server:
```bash
npm start
```
✅ Once both servers are running, open your browser and go to:
```bash
    http://localhost:3000
```

<h2 align="left">🖥️ Launching the Application</h2>

## 🔗 Step 1: Connect to Slack

On your first visit, you’ll be greeted with a clean interface displaying a “Connect to Slack” button.
Click this button to initiate the Slack OAuth flow.
You’ll be redirected to Slack to choose your workspace and authorize the app.


<img width="1267" height="823" alt="Screenshot 2025-08-07 190229" src="https://github.com/user-attachments/assets/de7a810e-5c7c-4590-94ae-b0c030a69a96" />

After successful authentication, you’ll return to your app with a message:

✅ “Slack Connected Successfully!”

## 🗂️ Step 2: Redirected Back to Localhost & View UI

After successfully connecting your Slack workspace, you'll be redirected back to your application interface hosted at:


```bash
http://localhost:5000
```

To load the updated interface, simply refresh the page.
Now, you’ll see the main dashboard where you can:

Action	Description
| Action       |          Description                                           |
|-------------|--------------------------------------------------------|
| ✏️ Enter Team & Channel ID |	Fill in the Slack Team ID and Channel ID where the message should be sent                |
| 💬 Write Message  | Type your message in the input box provided                        |
| 🕒 Select Schedule Time | Choose the exact date and time for sending the message                                     |
| 📤 Click Send Message     | Click the “Send Message” button to schedule or instantly send the message                                     |
| 📋 View Scheduled Messages   | Scroll down to see all scheduled messages with their statuses           |

<img width="1134" height="912" alt="Screenshot 2025-08-07 190417" src="https://github.com/user-attachments/assets/f46689c1-ffa7-4791-b43d-a396c32a92cc" />

## 🔄 Step 3: Schedule a Message & View Status

After you've connected your Slack workspace and filled out the Team ID, Channel ID, and your message:

✍️ Enter all required details
    Make sure your Slack Team ID, Channel ID, and message are filled out.
🕒 Optionally pick a time
    Choose a future time to schedule the message, or leave it blank to send instantly.
📤 Click “Send Message”
 Refresh the Page	After refreshing, your message will still appear as Pending in the UI

# ✅ Status: Pending
Any message scheduled for a future time will show up with a Pending status in the “Scheduled Messages” section.

<img width="1665" height="917" alt="Screenshot 2025-08-07 191014" src="https://github.com/user-attachments/assets/31d1fb1d-67b2-4a4f-a145-0cee6b5465e5" />

Once the scheduled time is reached:

| Action       |                Description                                           |
|-------------|--------------------------------------------------------|
| ⏰ Wait for Scheduled Time |The backend service will track the scheduled time for each message             |
| 📡 Auto Dispatch  | The message is automatically sent to the specified Slack channel                      |
| 🔄 Refresh the Page | Upon refreshing, the message status will update from Pending to Sent                                     |

# ✅ Status: Sent

<img width="1531" height="908" alt="Screenshot 2025-08-07 191157" src="https://github.com/user-attachments/assets/76e2fec7-2cfc-44df-980d-ea6c5d2cb7ed" />

## ❌ Step 5: Cancel a Scheduled Message Before It Sends

Sometimes plans change — and so should your messages.

| Action       |                Description                                           |
|-------------|--------------------------------------------------------|
| 📋 Find Pending Message |	Locate your message in the Scheduled Messages section marked as Pending            |
| 🗑️ Click Cancel/Delete  | Hit the Cancel or Delete button next to the message                     |
|✅ Confirm Removal | The message is instantly removed and won’t be sent to Slack                           |

# 🚫 Status: Cancelled
Cancelled messages are no longer in the queue and are not sent.

<img width="1385" height="896" alt="Screenshot 2025-08-07 191832" src="https://github.com/user-attachments/assets/4b81faf6-ef30-4539-afb4-2e1748030ad1" />

❌  Cancel a Scheduled Message


| Action       |                Description                                           |
|-------------|--------------------------------------------------------|
| ⏳ Before Cancel |	The message appears in the Scheduled Messages list with status Pending.           |
| ❌ After Cancel  | After clicking the Cancel/Delete button, the message disappears or shows status Cancelled.                    |

<img width="1387" height="876" alt="Screenshot 2025-08-07 191851" src="https://github.com/user-attachments/assets/eed8afc7-9fb9-49ed-80d3-964995ec4498" />

✅ The message will no longer be sent to Slack.

# 📬 Step 6: View Sent Messages on Slack

| Action       |                Description                                           |
|-------------|--------------------------------------------------------|
| ✅ Open Slack |	Go to your connected Slack workspace or channel.           |
| 👀 View Message  |The message you scheduled will be visible like any other message.                     |
| 🔄 Real-Time Sync | Everything is reflected both on your app and Slack with real-time accuracy.                          |

<img width="1856" height="923" alt="Screenshot 2025-08-07 191950" src="https://github.com/user-attachments/assets/0965ebd4-180f-4c60-8d84-de130844b210" />

# ♻️ Step 7: Token Handling & Message Persistence

After sending or scheduling messages, the system continues to ensure robustness and reliability, even across sessions.

| Action       |                Description                                           |
|-------------|--------------------------------------------------------|
| 🔐 Slack Token Refresh |	If your Slack token expires, the system auto-refreshes it using Slack's OAuth 2.0 flow — keeping your session active.         |
| 💾 Message Persistence  |Scheduled messages are saved in MongoDB, so even after you refresh the browser or revisit later — your data is intact.                    |
| 🔄 No Re-login Needed | Unless your session expires, you stay logged in — no need to reconnect repeatedly.                         |


## 🙏 A Note to the Refold Team

Respected Sir/Madam,

Thank you for giving me the opportunity to take part in this assessment through the development of this application.

This project was more than just a technical task — it was a chance to explore meaningful user interaction, manage real-world OAuth flows, and ensure reliability through thoughtful design. I’ve focused on clean architecture, scalability, and user experience throughout the development process.

I genuinely enjoyed solving this challenge and would be excited to contribute to building tools that help language learners stay connected and productive.

Looking forward to your feedback!

Warm regards,  
Raj Singh  




