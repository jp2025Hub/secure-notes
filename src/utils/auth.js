const MASTER_KEY = 'secure-notes-master-key'
const LAST_AUTH_TIME_KEY = 'secure-notes-last-auth-time'

/**
 * Verifica se existe uma palavra-mestre guardada.
 * @returns {boolean} Verdadeiro se existir palavra-mestre.
 */
export function hasMasterPassword() {
  return !!localStorage.getItem(MASTER_KEY)
}

/**
 * Obtém a palavra-mestre guardada.
 * @returns {string|null} Palavra-mestre atual ou null.
 */
export function getMasterPassword() {
  return localStorage.getItem(MASTER_KEY)
}

/**
 * Define uma nova palavra-mestre e atualiza o timestamp da sessão.
 * @param {string} pw Palavra-mestre a guardar.
 */
export function setMasterPassword(pw) {
  localStorage.setItem(MASTER_KEY, pw)
  updateAuthTimestamp()
}

/**
 * Valida se a palavra introduzida corresponde à palavra-mestre.
 * @param {string} input Palavra introduzida pelo utilizador.
 * @returns {boolean} Verdadeiro se a palavra for correta.
 */
export function validateMasterPassword(input) {
  const isValid = input === getMasterPassword()
  if (isValid) updateAuthTimestamp()
  return isValid
}

/**
 * Verifica se a sessão é válida (último login há menos de 5 minutos).
 * @returns {boolean} Verdadeiro se a sessão ainda estiver ativa.
 */
export function isSessionValid() {
  const timestamp = localStorage.getItem(LAST_AUTH_TIME_KEY)
  if (!timestamp) return false

  const now = Date.now()
  const elapsed = now - parseInt(timestamp, 10)
  return elapsed < 5 * 60 * 1000
}

/**
 * Atualiza o timestamp de autenticação da sessão.
 * @private
 */
function updateAuthTimestamp() {
  localStorage.setItem(LAST_AUTH_TIME_KEY, Date.now().toString())
}
