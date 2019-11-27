import React, { Fragment } from 'react'

// Components
import { ProductoLista } from '../components/index'

// Hooks
import { useGET } from '../hooks/useGET'

export const Productos = () => {
  const { productos } = useGET()

  return (
    <Fragment>
      <h1 className="title has-text-centered"> Libros </h1>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th className="has-text-centered">Nombre</th>
            <th className="has-text-centered">Autor</th>
            <th className="has-text-centered">Genero</th>
            <th className="has-text-centered">Código</th>
            <th className="has-text-centered">Editorial</th>
            <th className="has-text-centered">Año</th>
            <th className="has-text-centered">Editar</th>
            <th className="has-text-centered">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <ProductoLista key={producto._id} producto={producto} />
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}
