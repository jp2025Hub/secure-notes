import React, { useState, useEffect } from 'react'
import { encryptNote } from '../utils/crypto'
import { updateNote } from '../utils/storage'
import { getMasterPassword } from '../utils/auth'

/**
 * Modal para editar uma nota existente.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.note - Nota a editar (inclui conteúdo desencriptado).
 * @param {Function} props.onClose - Fecha o modal.
 * @param {Function} props.onSave - Atualiza a lista de notas no componente pai.
 * @returns {JSX.Element}
 */
function EditModal({ note, onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    setTitle(note.title || '')
    const decrypted = note.decrypted || ''
    setContent(decrypted)
  }, [note])

  /**
   * Atualiza a nota no armazenamento e fecha o modal.
   */
  const handleUpdate = () => {
    const encrypted = encryptNote(content, getMasterPassword())
    const updatedNote = {
      ...note,
      title: title.trim() || 'Sem título',
      data: encrypted,
    }
    updateNote(updatedNote)
    onSave()
    onClose()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Editar Nota</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleUpdate}>💾 Atualizar</button>
        <button className="close-btn" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  )
}

export default EditModal
