import React from 'react'
import NoteItem from './NoteItem'

/**
 * Lista de notas com botões para abrir, editar e apagar.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.notes - Lista de notas a mostrar.
 * @param {Function} props.onOpen - Ação ao abrir uma nota.
 * @param {Function} props.onDelete - Ação ao apagar uma nota.
 * @param {Function} props.onEdit - Ação ao editar uma nota.
 * @returns {JSX.Element}
 */
function NoteList({ notes, onOpen, onDelete, onEdit }) {
  return (
    <div className="note-list">
      <h2>Minhas Notas</h2>
      {notes.length === 0 ? (
        <p>Sem notas guardadas.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onOpen={onOpen}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default NoteList
