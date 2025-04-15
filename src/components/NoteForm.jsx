import React, { useState, useEffect } from 'react'
import { encryptNote } from '../utils/crypto'
import { saveNote, updateNote } from '../utils/storage'
import { getMasterPassword } from '../utils/auth'

/**
 * Formulário para criação e edição de notas encriptadas.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onSave - Função a chamar após guardar nota.
 * @param {Object} [props.editingNote] - Nota a ser editada (opcional).
 * @returns {JSX.Element}
 */
function NoteForm({ onSave, editingNote }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || '')
      const decrypted = editingNote.decrypted || ''
      setContent(decrypted)
    }
  }, [editingNote])

  /**
   * Encripta e guarda ou atualiza uma nota no armazenamento local.
   */
  const handleSaveNote = () => {
    if (!content.trim()) {
      alert('A nota não pode estar vazia.')
      return
    }

    const encrypted = encryptNote(content, getMasterPassword())

    const note = {
      id: editingNote?.id || Date.now(),
      title: title.trim() || 'Sem título',
      data: encrypted,
      createdAt: editingNote?.createdAt || new Date().toISOString(),
    }

    if (editingNote) {
      updateNote(note)
    } else {
      saveNote(note)
    }

    if (onSave) onSave()

    setTitle('')
    setContent('')
  }

  return (
    <div className="note-form">
      <h2>{editingNote ? 'Editar Nota' : 'Nova Nota'}</h2>
      <input
        type="text"
        placeholder="Título (opcional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Escreve aqui a tua nota..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSaveNote}>
        {editingNote ? '💾 Atualizar Nota' : '🔐 Guardar Nota'}
      </button>
    </div>
  )
}

export default NoteForm
