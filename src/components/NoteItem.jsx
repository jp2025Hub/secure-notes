import React from 'react'

/**
 * Representa um item da lista de notas com ações.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.note - Nota a apresentar.
 * @param {Function} props.onOpen - Ação para abrir/desencriptar a nota.
 * @param {Function} props.onDelete - Ação para apagar a nota.
 * @param {Function} props.onEdit - Ação para editar a nota.
 * @returns {JSX.Element}
 */
function NoteItem({ note, onOpen, onDelete, onEdit }) {
  return (
    <li className="note-item">
      <strong>{note.title}</strong> <br />
      <small>{new Date(note.createdAt).toLocaleString()}</small> <br />
      <button onClick={() => onOpen(note)}>🔓 Abrir</button>
      <button onClick={() => onEdit(note)}>✏️ Editar</button>
      <button onClick={() => onDelete(note.id)}>🗑 Apagar</button>
    </li>
  )
}

export default NoteItem
