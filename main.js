const { app, BrowserWindow, ipcMain } = require('electron');
const { execFile } = require('child_process');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 850,
        height: 675,
        autoHideMenuBar: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('index.html');
});

ipcMain.on('run-exe', (event, args) => {
    const { scrcpy_path, resolution, vcodec, vbitrate, acodec, abitrate, fps, gamepad, keyboard, mouse, device_connection } = args;

    const execArgs = [];
    if (resolution) execArgs.push(resolution);
    if (vcodec) execArgs.push(vcodec);
    if (vbitrate) execArgs.push(vbitrate);
    if (acodec) execArgs.push(acodec);
    if (abitrate) execArgs.push(abitrate);
    if (fps) execArgs.push(fps);
    if (gamepad) execArgs.push(gamepad);
    if (keyboard) execArgs.push(keyboard);
    if (mouse) execArgs.push(mouse);
    if (device_connection) execArgs.push(device_connection);


    execFile(scrcpy_path, execArgs, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            event.reply('exe-error', error.message);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
        }
        console.log(`Output: ${stdout}`);
        event.reply('exe-output', stdout);
    });
});