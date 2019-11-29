import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => (
  <nav
    className="navbar is-danger"
    role="navigation"
    aria-label="main navigation"
  >
    <div id="navbarBasicExample">
      <div className="navbar-start">
        <Link to="/libros" className="navbar-item">
          Librería COA
        </Link>
        <Link to="/libros" className="navbar-item">
          Libros
        </Link>
        <Link to="/productos/nuevo" className="navbar-item">
          Nuevo libro
        </Link>
      </div>
    </div>
  </nav>
)
