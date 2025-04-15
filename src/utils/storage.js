const STORAGE_KEY = 'secureNotes'

/**
 * Obtém todas as notas guardadas no localStorage.
 * @returns {Array<Object>} Lista de notas.
 */
export function getNotes() {
  const notes = localStorage.getItem(STORAGE_KEY)
  return notes ? JSON.parse(notes) : []
}

/**
 * Guarda uma nova nota no início da lista.
 * @param {Object} note Nota a guardar.
 */
export function saveNote(note) {
  const notes = getNotes()
  const updatedNotes = [note, ...notes]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes))
}

/**
 * Apaga uma nota com base no seu ID.
 * @param {number} id ID da nota a remover.
 */
export function deleteNote(id) {
  const notes = getNotes().filter(note => note.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

/**
 * Atualiza uma nota existente com novos dados.
 * @param {Object} updatedNote Nota atualizada.
 */
export function updateNote(updatedNote) {
  const notes = getNotes().map(note =>
    note.id === updatedNote.id ? updatedNote : note
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}
