const { app, BrowserWindow, ipcMain } = require("electron");
const Store = require("electron-store");
const store = new Store();

const DEFAULT_SIZE = {
    width: 300,
    height: 400
};

let mainWindow;

const createWindow = () => {

    const pos = store.get("window.pos") || [0, 0];
    const size = store.get("window.size") || [DEFAULT_SIZE.width, DEFAULT_SIZE.height];

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false,
        width: size[0],
        height: size[1],
        x: pos[0],
        y: pos[1],
        alwaysOnTop: true,
        frame: false,
        opacity: 0.9
    });

    mainWindow.loadFile("./src/index.html");

    mainWindow.webContents.openDevTools();

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    })

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
};

app.on("ready", createWindow);

app.on("before-quit", () => {
    store.set("window.pos", mainWindow.getPosition());
    store.set("window.size", mainWindow.getSize());
});

app.on("window-all-closed", () => {
    if (process.platform != "darwin") app.quit();
});

app.on("activate", () => {
    if (mainWindow == null) createWindow();
});

ipcMain.handle("get-contents", (e) => {
    const contents = store.get("contents") || {};

    return contents;
});

ipcMain.handle("change-contents", async (e, data) => {
    store.set("contents", data);

    return true;
});