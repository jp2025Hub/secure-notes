import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import './index.css'
import {
  hasMasterPassword,
  setMasterPassword,
  validateMasterPassword,
  isSessionValid
} from './utils/auth'

/**
 * Componente principal da aplicação.
 * Responsável por autenticar o utilizador com a palavra-mestre e renderizar o conteúdo principal.
 *
 * @component
 * @returns {JSX.Element} O componente App com autenticação e a interface principal.
 */
function App() {
  /** @type {[boolean, Function]} Estado de autenticação do utilizador */
  const [authenticated, setAuthenticated] = useState(false)

  /**
   * Efeito para verificar se a sessão é válida ou se é necessário pedir a palavra-mestre.
   * Se a palavra-mestre ainda não estiver definida, pede uma ao utilizador.
   */
  useEffect(() => {
    if (isSessionValid()) {
      setAuthenticated(true)
      return
    }

    if (!hasMasterPassword()) {
      const pw = prompt('Define a tua palavra-mestre:')
      if (pw && pw.trim()) {
        setMasterPassword(pw)
        setAuthenticated(true)
      }
    } else {
      const pw = prompt('Insere a tua palavra-mestre:')
      if (validateMasterPassword(pw)) {
        setAuthenticated(true)
      } else {
        alert('Palavra-mestre incorreta.')
      }
    }
  }, [])

  if (!authenticated) return <p>A autenticar...</p>

  return (
    <div className="app-container">
      <header>
        <h1>Secure Notes</h1>
        <p>As tuas notas protegidas por palavra-passe, sempre privadas.</p>
      </header>
      <main>
        <Home />
      </main>
      <footer>
        <small>© {new Date().getFullYear()} João Cabral</small>
      </footer>
    </div>
  )
}

export default App
