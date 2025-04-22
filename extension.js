const vscode = require('vscode');
const fs = require('fs');
const os = require('os');
const path = require('path');

let logFilePath;
let activeChunks = 0;
let currentWorkspace = '';
let lastActivityTime = new Date();
let intervalHandle;

/**
 * Log to file
 * @param {string} message
 */
function logToFile(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${currentWorkspace}] ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
}


/**
 * Start tracking a workspace
 * @param {string} workspaceName
 */
function startTracking(workspaceName) {
  currentWorkspace = workspaceName;
  activeChunks = 0;
  lastActivityTime = new Date();
  logToFile(`Started tracking workspace: ${workspaceName}`);

  // Start timer: check every 30 seconds
  intervalHandle = setInterval(() => {
    const now = new Date();
    const secondsSinceLastActivity = (now.getTime() - lastActivityTime.getTime()) / 1000;

    if (secondsSinceLastActivity <= 30) {
      activeChunks++;
      logToFile(`Active (+30s)`);
    } else {
      logToFile(`Idle`);
    }
  }, 30000);
}

/**
 * Stop tracking and log duration
 */
function stopTracking() {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    const totalMinutes = (activeChunks * 30) / 60;
    logToFile(`Stopped tracking workspace: ${currentWorkspace}`);
    logToFile(`Total active time: ${totalMinutes.toFixed(1)} minutes\n`);
  }
}

/**
 * Detect activity (e.g., typing, file changes)
 * @param {{ subscriptions: vscode.Disposable[]; }} context
 */
function registerActivityListeners(context) {
  vscode.workspace.onDidChangeTextDocument(() => {
    lastActivityTime = new Date();
  }, null, context.subscriptions);

  vscode.window.onDidChangeWindowState((e) => {
    if (e.focused) {
      lastActivityTime = new Date();
    }
  }, null, context.subscriptions);
}

/**
 * @param {{ subscriptions: any; }} context
 */
function activate(context) {
  // Setup log file
  const logDir = path.join(os.homedir(), '.devtracka');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  logFilePath = path.join(logDir, 'tracking.log');
  const workspace = vscode.workspace.name || 'Untitled Workspace';
  startTracking(workspace);
  registerActivityListeners(context);
  vscode.workspace.onDidChangeWorkspaceFolders(() => {
    stopTracking();
    const newWorkspace = vscode.workspace.name || 'Untitled Workspace';
    startTracking(newWorkspace);
  }, null, context.subscriptions);

  //command to show logs
  context.subscriptions.push(vscode.commands.registerCommand('devtracka.showLogs', () => {
	vscode.window.showTextDocument(vscode.Uri.file(logFilePath));
  }));
  

  // On shutdown
  context.subscriptions.push({
    dispose: () => {
      stopTracking();
    }
  });

  vscode.window.showInformationMessage(`DevTracka is running in "${workspace}"`);
}

function deactivate() {
  stopTracking();
}

module.exports = {
  activate,
  deactivate
};
