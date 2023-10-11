import { app, BrowserWindow } from "electron";

let window: BrowserWindow;

app.whenReady().then(() => {
    window = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        },
    });

    if (process.argv[2]) {
        window.webContents.loadURL(process.argv[2]);
        return;
    }

    window.webContents.loadFile("index.html");
});

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on("second-instance", () => {
        if (window) {
            if (window.isMinimized()) {
                window.restore();
            }
            window.focus();
            window.show();
        }
    });
}
