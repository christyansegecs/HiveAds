
// electron/preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    windowControls: {
        close: () => ipcRenderer.send('window:close'),
        minimize: () => ipcRenderer.send('window:minimize'),
        toggleMaximize: () => ipcRenderer.send('window:toggle-maximize'),

        // redimensionar janela
        setSize: (width, height, minWidth, minHeight) => {
            ipcRenderer.send('window:setSize', {
                width,
                height,
                minWidth,
                minHeight,
            })
        },
    },
})