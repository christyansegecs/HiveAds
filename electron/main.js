
// electron/main.js
const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const { setupLogger } = require('./logger')
const { setupAutoUpdate } = require('./updater')

const isDev = !app.isPackaged

let mainWindow
const log = setupLogger()

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 464,
        height: 628,

        show: false,

        frame: false,
        titleBarStyle: 'hiddenInset',
        transparent: true,
        backgroundColor: '#00000000',

        hasShadow: false,

        resizable: true,
        minWidth: 464,
        minHeight: 628,

        icon: path.join(__dirname, 'assets', 'icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    const url = isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../out/index.html')}`

    mainWindow.loadURL(url)

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    try {
        setupAutoUpdate(mainWindow)
    } catch (err) {
        log.warn('Falha ao inicializar auto-update:', err)
    }
}



// Fix for transparency on Windows
app.disableHardwareAcceleration()

app.on('ready', () => {
    createMainWindow()

    // IPC básico
    ipcMain.handle('ping', () => {
        log.info('Ping recebido do renderer')
        return 'pong'
    })

    ipcMain.handle('get-app-version', () => {
        return app.getVersion()
    })

    ipcMain.on('log-message', (_, message) => {
        log.info('[Renderer]', message)
    })

    // endpoint pra mudar o tamanho da janela após o login
    ipcMain.on('window:setSize', (_, payload) => {
        if (!mainWindow) return

        const {
            width,
            height,
            minWidth,
            minHeight,
        } = payload || {}

        // libera redimensionamento pro app principal
        mainWindow.setResizable(true)

        if (minWidth && minHeight) {
            mainWindow.setMinimumSize(minWidth, minHeight)
        }

        if (width && height) {
            mainWindow.setSize(width, height)
        }

        mainWindow.center()
    })

    // Controles de janela (semáforo)
    ipcMain.on('window:minimize', () => {
        if (!mainWindow) return
        mainWindow.minimize()
    });

    ipcMain.on('window:toggle-maximize', () => {
        if (!mainWindow) return
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize()
        } else {
            mainWindow.maximize()
        }
    })

    ipcMain.on('window:close', () => {
        if (!mainWindow) return
        mainWindow.close()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow()
    }
})