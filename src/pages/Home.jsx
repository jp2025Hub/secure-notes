import React, { useState } from 'react'
import NoteForm from '../components/NoteForm'
import NoteList from '../components/NoteList'
import Modal from '../components/Modal'
import EditModal from '../components/EditModal'
import { getNotes, deleteNote } from '../utils/storage'
import { decryptNote } from '../utils/crypto'
import { getMasterPassword } from '../utils/auth'

/**
 * Página principal que gere as notas, incluindo:
 * - Listagem
 * - Criação
 * - Edição (via modal)
 * - Visualização (via modal)
 *
 * @component
 * @returns {JSX.Element}
 */
function Home() {
  const [notes, setNotes] = useState(getNotes())
  const [activeNote, setActiveNote] = useState(null)
  const [editingNote, setEditingNote] = useState(null)

  /**
   * Atualiza o estado das notas depois de guardar/editar.
   */
  const handleSave = () => {
    setNotes(getNotes())
    setEditingNote(null)
  }

  /**
   * Apaga uma nota específica.
   * @param {number} id - ID da nota a apagar.
   */
  const handleDelete = (id) => {
    deleteNote(id)
    setNotes(getNotes())
  }

  /**
   * Desencripta uma nota e prepara-a para edição.
   * @param {Object} note - Nota a editar.
   */
  const handleEdit = (note) => {
    const decrypted = decryptNote(note.data, getMasterPassword())
    if (decrypted) {
      setEditingNote({ ...note, decrypted })
    } else {
      alert('Erro ao desencriptar a nota para edição.')
    }
  }

  return (
    <div className="home">
      <NoteForm onSave={handleSave} />
      <NoteList
        notes={notes}
        onOpen={setActiveNote}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {activeNote && (
        <Modal note={activeNote} onClose={() => setActiveNote(null)} />
      )}
      {editingNote && (
        <EditModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

export default Home
