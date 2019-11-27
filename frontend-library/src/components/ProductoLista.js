import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'

const ProductoLista = ({ producto, history }) => {
  const eliminarProducto = id => {
    Swal.fire({
      title: '¿Estás seguro human?',
      text: 'Una vez eliminado, no se podra recuperar...',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async result => {
      if (result.value) {
        try {
          const url = `http://localhost:4000/delete/${id}`
          const resultado = await axios.delete(url)
          if (resultado.status === 200) {
            Swal.fire('Eliminado!', 'El producto se ha eliminado', 'success')
            history.push('/')
          }
        } catch (err) {
          console.log(err)
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Hubo un error, verifica',
          })
        }
      }
    })
  }

  const data = () => {
    return (
      <tr>
        <td>{producto.nombre}</td>
        <td>{producto.autor}</td>
        <td>{producto.genero}</td>
        <td>{producto.codigo}</td>
        <td>{producto.editorial}</td>
        <td>{producto.ano}</td>
        <td>
          <Link to={`productos/editar/${producto._id}`}>Editar</Link>
        </td>
        <td>
          <button
            className="button"
            onClick={() => eliminarProducto(producto._id)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    )
  }

  return data()
}

export default withRouter(ProductoLista)
