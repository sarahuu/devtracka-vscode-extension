
# 🧠 DevTracka VSCode Xtension

**DevTracka** is inspired by Wakatime. Will basically do everything wakatime does.
There'll be a RESTAPI and ofcourse Dashboard.
Using this project to learn javascript.
Proper documentation coming up soon.

---

## ✅ Work Done

- **Auto Tracking**: Starts tracking automatically when VSCode launches.
- **Activity Logging**: Logs active coding time at 30-second intervals.
- **Idle Detection**: Pauses tracking when idle and resumes when active.
- **Workspace Tracking**: Tracks activity per workspace to ensure you know exactly where your time is spent.
- **Log Storage**: Saves logs to a file in your home directory for easy access.
- **Workspace Switch Detection**: Automatically resets tracking when switching between workspaces.

---

## 🛠 Work Yet to Be Done

- **Log Migration**: Migrate from text-based logging to JSON-based logs (for easier parsing tbh)
- **Log Syncing**: Sync local activity logs with the **DevTracka** backend database via the DevTracka API (To be built soon).
- **Local Log Deletion**: After successful sync, automatically delete local logs.
- **Retry Mechanism**: Implement a retry mechanism to handle failed sync attempts, ensuring no data is lost.
- **File-Level Tracking**: Introduce file-level activity tracking to monitor the time spent on each file (probably the last thing i'll do)
- **Real-Time Sync**: In the future (nearest), implement real-time communication between the extension and the backend to update logs instantly. But for now, updates will occur at batch intervals (e.g., every 10 minutes).

