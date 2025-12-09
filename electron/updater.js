
// electron/updater.js
const { autoUpdater } = require('electron-updater')
const log = require('electron-log')

function setupAutoUpdate(mainWindow) {
  autoUpdater.logger = log
  autoUpdater.autoDownload = true

  autoUpdater.on('checking-for-update', () => {
    log.info('Verificando atualizações...')
    mainWindow.webContents.send('update:status', 'checking')
  })

  autoUpdater.on('update-available', (info) => {
    log.info('Atualização disponível', info)
    mainWindow.webContents.send('update:status', 'available')
  })

  autoUpdater.on('update-not-available', () => {
    log.info('Nenhuma atualização disponível')
    mainWindow.webContents.send('update:status', 'none')
  })

  autoUpdater.on('download-progress', (progress) => {
    mainWindow.webContents.send('update:progress', progress)
  })

  autoUpdater.on('update-downloaded', () => {
    log.info('Atualização baixada, será instalada ao sair')
    mainWindow.webContents.send('update:status', 'downloaded')
  })

  // Dispara a verificação
  autoUpdater.checkForUpdatesAndNotify()
}

module.exports = { setupAutoUpdate }