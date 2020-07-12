const { app, BrowserWindow } = require('electron')
var kill  = require('tree-kill');
//Exchange rate backend API
var jarPath = app.getAppPath() + '\\webcrawler-0.0.1-SNAPSHOT.jar';
var child = require('child_process').spawn(
    'java', ['-jar', jarPath, '']
);

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 750,
    show:false,
    // fullscreen: true,

    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen:true
    }
  })

// and load the index.html of the app.
setTimeout(function() {
  win.loadURL(`file://${__dirname}/app/index.html`)
}, 10000);

win.once('ready-to-show',()=>{
  win.show()
})

win.on('closed', function () {
  kill(child.pid);
  mainWindow = null
})

// Open the DevTools.
  // win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.