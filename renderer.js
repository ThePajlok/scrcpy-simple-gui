const { ipcRenderer } = require('electron');

document.getElementById('executeForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const scrcpy_path = document.getElementById('scrcpy_path').value;
    const resolution = document.getElementById('resolution').value;
    const vcodec = document.getElementById('vcodec').value;
    const vbitrate = document.getElementById('vbitrate').value;
    const acodec = document.getElementById('acodec').value;
    const abitrate = document.getElementById('abitrate').value;
    const fps = document.getElementById('fps').value;
    const gamepad = document.getElementById('gamepad').value;
    const keyboard = document.getElementById('keyboard').value;
    const mouse = document.getElementById('mouse').value;
    const device_connection = document.getElementById('device_connection').value;

    ipcRenderer.send('run-exe', { scrcpy_path, device_connection, gamepad, keyboard, mouse, resolution, vcodec, vbitrate, acodec, abitrate, fps });
});

ipcRenderer.on('exe-error', (event, errorMessage) => {
    alert(`Error: ${errorMessage}`);
});

ipcRenderer.on('exe-output', (event, output) => {
    alert(`Success: ${output}`);
});