import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => (
  <nav
    className="navbar is-dark"
    role="navigation"
    aria-label="main navigation"
  >
    <div id="navbarBasicExample">
      <div className="navbar-start">
        <Link to="/productos" className="navbar-item">
          Librería COA
        </Link>
        <Link to="/productos" className="navbar-item">
          Libros
        </Link>
        <Link to="/productos/nuevo" className="navbar-item">
          Nuevo libro
        </Link>
      </div>
    </div>
  </nav>
)
