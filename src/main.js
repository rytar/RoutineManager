const { app, BrowserWindow } = require("electron");

let mainWindow;

const createWindow = () => {

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        width: 300,
        height: 400,
        alwaysOnTop: true,
        frame: false
    });

    mainWindow.loadFile("index.html");

    // mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform != "darwin") app.quit();
});

app.on("activate", () => {
    if (mainWindow == null) createWindow();
});