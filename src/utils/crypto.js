import CryptoJS from 'crypto-js'

/**
 * Encripta o conteúdo da nota usando AES.
 * @param {string} noteContent Conteúdo da nota a encriptar.
 * @param {string} password Palavra-mestre usada na encriptação.
 * @returns {string} Texto encriptado em Base64.
 */
export function encryptNote(noteContent, password) {
  return CryptoJS.AES.encrypt(noteContent, password).toString()
}

/**
 * Tenta desencriptar uma nota com a palavra fornecida.
 * @param {string} encryptedNote Texto encriptado (Base64).
 * @param {string} password Palavra-mestre usada na encriptação.
 * @returns {string|null} Texto desencriptado ou null se falhar.
 */
export function decryptNote(encryptedNote, password) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedNote, password)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return decrypted || null
  } catch (err) {
    return null
  }
}
