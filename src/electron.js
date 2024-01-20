const {
    app,
    BrowserWindow,
    ipcMain,
    Tray,
    Menu
} = require("electron");

const ioHook = require('iohook');
const path = require("path");

const isDev = (process.argv && process.argv[2] == "development");

// 当前服务地址
let appUrl = path.join(app.getAppPath(), '/');



let tray = null;

function createWindow() {

    // 创建窗口对象
    const win = new BrowserWindow({
        width: 10,
        height: 10,
        // 开启node在渲染进程中使用
        webPreferences: {
            // 在预加载可以使用node
            nodeIntegration: true,
            // 在预加载中的require 使用node
            nodeIntegrationInWorker: true,
            preload: path.join(__dirname, "./rendder.js")
        },
        show: false
    });

    // 关闭默认菜单
    win.setMenu(null);

    ioHook.start(false);
    const eventHandler = function (type) {
        switch (type) {
            case 'mouseclick right':
                console.log('mouse is click! right');
                break;
            case 'mouseclick left':
                console.log('mouse is click! left')
                win.webContents.send('reply',1);
                break;
        }
    }
    ioHook.start(false);
    ioHook.on('mousedown', (e) => { 
        if(e.button == 1){
            eventHandler('mouseclick right') 
        }else{
            eventHandler('mouseclick left') 
        }
    });
    ioHook.on('mouseup', () => { eventHandler('mouseup') });
    ioHook.on('mousedrag', () => { eventHandler('mousedrag') });
    ioHook.on('mousewheel', () => { eventHandler('mousewheel') });
    app.on('before-quit', () => {
        // 卸载iohook监听
        ioHook.unload();
        ioHook.stop();
    });


    // 窗口关闭的监听  
    win.on('closed', (event) => {
        win = null;
    });
    // 触发关闭时触发
    win.on('close', (event) => {
        // 截获 close 默认行为
        event.preventDefault();
        // 点击关闭时触发close事件，我们按照之前的思路在关闭时，隐藏窗口，隐藏任务栏窗口
        win.hide();
        win.setSkipTaskbar(true);

    });

    tray = new Tray(path.join(__dirname, "./../public/favicon.ico"));
    tray.setToolTip('按键音乐');
    // 托盘菜单
    const contextMenu = Menu.buildFromTemplate([
    {
        label: '退出',
        click: () => { app.quit(); }
    }
    ]);

    setTimeout(() => {
        win.hide();
    },1000)

    // 载入托盘菜单
    tray.setContextMenu(contextMenu);
    // 双击触发
    tray.on('double-click', () => {
        // 双击通知区图标实现应用的显示或隐藏
        if(win.isVisible()){
            win.hide();
            win.setSkipTaskbar(false)
        }else{
            win.show();
            win.setSize(400, 300);
            win.setSkipTaskbar(true);
        }
    });



    // 页面加载完成
    win.webContents.on("did-finish-load", () => {
        win.show();
        win.focus();
    });
    
    if (isDev){
        // 读取渲染进程文件
        win.loadFile("./index.html");
        win.webContents.openDevTools();
    }else{
        // win.webContents.openDevTools();
        win.loadFile("./../../index.html");
    }
}

// 应用程序加载完成
app.whenReady().then(() => {
    createWindow();
    Menu.setApplicationMenu(null);
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