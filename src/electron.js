const {
    app,
    BrowserWindow
} = require("electron");

const path = require("path");

const isDev = (process.argv && process.argv[2] == "development");

console.log(process.argv,"process.argv")

function createWindow() {

    // 创建窗口对象
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        // 开启node在渲染进程中使用
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        show: false
    });

    // 页面加载完成
    window.webContents.on("did-finish-load", () => {
        window.show();
        window.focus();
    });
    if(process.argv[3]){
        window.loadURL(process.argv[3]);
    }else{
        // 读取渲染进程文件
        window.loadFile(isDev ? "../dist/index.html": "./dist/index.html");
    }

    if(isDev) window.webContents.openDevTools()
}

// 应用程序加载完成
app.whenReady().then(() => {
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