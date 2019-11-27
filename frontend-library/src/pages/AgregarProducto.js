import React, { Fragment } from 'react'

// Components
import { FormIngresar } from '../components/index'

export const AgregarProducto = () => {
  return (
    <Fragment>
      <h1 className="title has-text-centered"> Agregar libros </h1>
      <section className="hero is-light">
        <div className="hero-body">
          <FormIngresar />
        </div>
      </section>
    </Fragment>
  )
}
