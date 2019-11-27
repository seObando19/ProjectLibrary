import React, { Fragment } from 'react'

// Components
import { ProductoLista } from '../components/index'

// Hooks
import { useGET } from '../hooks/useGET'

export const Productos = () => {
  const { productos } = useGET()

  return (
    <Fragment>
      <h1 className="title has-text-centered"> Productos </h1>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th className="has-text-centered">Referencia</th>
            <th className="has-text-centered">Nombre</th>
            <th className="has-text-centered">Observaciones</th>
            <th className="has-text-centered">Precio</th>
            <th className="has-text-centered">Impuesto</th>
            <th className="has-text-centered">Cantidad</th>
            <th className="has-text-centered">Estado</th>
            <th className="has-text-centered">Imagen</th>
            <th className="has-text-centered">Editar</th>
            <th className="has-text-centered">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <ProductoLista key={producto.id} producto={producto} />
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}
