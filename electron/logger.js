
const fs = require('fs')
const path = require('path')
const { app } = require('electron')
const log = require('electron-log')

function getLogFilePath() {
  const logDir = path.join(app.getPath('userData'), 'logs')

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
  }

  return path.join(logDir, 'app.log')
}

function setupLogger() {
  const filePath = getLogFilePath()

  // protege caso a API mude
  if (log.transports && log.transports.file) {
    log.transports.file.resolvePathFn = () => filePath
    log.transports.file.level = 'info'
  }

  if (log.transports && log.transports.console) {
    log.transports.console.level = 'info'
  }

  log.info('Logger inicializado em:', filePath)

  return log
}

module.exports = {
  setupLogger,
}