import React, { useEffect, useState } from 'react'
import { decryptNote } from '../utils/crypto'
import { getMasterPassword } from '../utils/auth'

/**
 * Modal para visualizar uma nota desencriptada.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.note - Nota encriptada a visualizar.
 * @param {Function} props.onClose - Função para fechar o modal.
 * @returns {JSX.Element}
 */
function Modal({ note, onClose }) {
  const [decryptedText, setDecryptedText] = useState(null)

  useEffect(() => {
    const decrypted = decryptNote(note.data, getMasterPassword())
    setDecryptedText(decrypted || 'Erro ao desencriptar a nota.')
  }, [note])

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{note.title}</h2>
        <p><small>{new Date(note.createdAt).toLocaleString()}</small></p>

        <div className="note-decrypted">
          <h3>Nota Desencriptada:</h3>
          <pre>{decryptedText}</pre>
        </div>

        <button className="close-btn" onClick={onClose}>Fechar</button>
      </div>
    </div>
  )
}

export default Modal
