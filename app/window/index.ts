import { app, BrowserWindow } from "electron";
import { join as joinPath } from "path";
import { format as formatUrl } from "url";

class Main {
    // keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
    private static window: any;

    public static init() {
        // this method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // some APIs can only be used after this event occurs.
        app.on("ready", this.createWindow);

        app.on("activate", this.activate);
        app.on("window-all-closed", this.allWindowsClosed);
    }

    private static activate() {
        // on OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (this.window === undefined) {
            this.createWindow();
        }
    }

    // quit when all windows are closed.
    private static allWindowsClosed() {
        // on OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== "darwin") {
            app.quit();
        }
    }

    // create the browser window.
    private static createWindow () {
        this.window = new BrowserWindow({
            width: 800,
            height: 600
        });
        // mainWindow.setMenu(null);

        this.window.loadURL(formatUrl({
            pathname: joinPath(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        }));

        // emitted when the window is closed.
        this.window.on("closed", () => {
            // dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.window = undefined;
        });
    }
}

// initialize the main app
Main.init();
