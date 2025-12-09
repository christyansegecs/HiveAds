
export type UpdateStatus =
  | 'checking'
  | 'available'
  | 'none'
  | 'downloaded'
  | 'error'

export function isElectron() {
  return typeof window !== 'undefined' && !!(window as any).electronAPI
}

export async function pingElectron() {
  if (!isElectron()) return null
  return (window as any).electronAPI.ping()
}

export async function getAppVersion() {
  if (!isElectron()) return null
  return (window as any).electronAPI.getAppVersion()
}

export function logToElectron(message: string) {
  if (!isElectron()) return
  (window as any).electronAPI.logMessage(message)
}

export function onUpdateStatus(callback: (status: UpdateStatus) => void) {
  if (!isElectron()) return
  (window as any).electronAPI.onUpdateStatus(callback)
}

export function onUpdateProgress(
  callback: (progress: { percent?: number }) => void,
) {
  if (!isElectron()) return
  (window as any).electronAPI.onUpdateProgress(callback)
}