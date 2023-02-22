const {
    app,
    BrowserWindow
} = require("electron");

const path = require("path");

// 引入pm2
const pm2 = require("pm2")

const isDev = (process.argv && process.argv[2] == "development");

// 当前服务地址
let appUrl = path.join(app.getAppPath(), '');
let unpackedUrl = path.join(app.getAppPath().replace('app.asar', 'app.asar.unpacked'), '');


console.log(appUrl, "appUrl")

// 主进程代码运行时 主进程代码会一直运行在 CPU 的时序中  因

function createWindow() {

    // 创建窗口对象
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        // 开启node在渲染进程中使用
        webPreferences: {
            // 在预加载可以使用node
            nodeIntegration: true,
            // 在预加载中的require 使用node
            nodeIntegrationInWorker: true,
            // 在页面中使用node
            nodeIntegrationInSubFrames: true,
            preload: appUrl + "preloads/preload.js",
        },
        show: false
    });

    // 页面加载完成
    window.webContents.on("did-finish-load", () => {
        window.show();
        window.focus();
    });
    // 第三个参数为加载URL地址
    if (process.argv[3]) {
        window.loadURL(process.argv[3]);
    } else {
        // 读取渲染进程文件
        window.loadFile(appUrl + "electron-renderer/index.html");
    }
    if(isDev) window.webContents.openDevTools();
}

// 应用程序加载完成
app.whenReady().then(() => {
    pm2.connect(function (err) {
        if (err) {
            console.error(err)
            process.exit(2);
            return;
        };

        pm2.start({
            script: unpackedUrl + "node/index.js",
            name: 'index',
            exec_mode: "fork_mode"
        }, function (err, apps) {

        })
    })

    createWindow();

    app.on("activate", () => {
        // 如果应用程序处理活动状态并且窗口全部关闭则创建一个默认空口
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// 所有窗口关闭时
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});