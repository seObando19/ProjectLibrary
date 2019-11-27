import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'

const ProductoLista = ({ producto, history }) => {
  
  const eliminarProducto = referencia => {
    Swal.fire({
      title: '¿Estás seguro human?',
      text: "Una vez eliminado, no se podra recuperar...",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then( async (result) => {
      if (result.value) {
        try {
          const url = `http://localhost:8089/prueba-aveonline/crud-php/producto.php/?referencia=${referencia}`
          const resultado = await axios.delete(url)
          if(resultado.status === 200){
            Swal.fire(
              'Eliminado!',
              'El producto se ha eliminado',
              'success'
            )
            history.push('/')
          }
        } catch(err){
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
    return(
      <tr>
        <td>{producto.referencia}</td>
        <td>{producto.nombre}</td>
        <td>{producto.observaciones}</td>
        <td>{producto.precio}</td>
        <td>{producto.impuesto}</td>
        <td>{producto.cantidad}</td>
        <td>{producto.estado}</td>
        <td>{producto.imagen}</td>
        <td>
          <Link to={`/productos/editar/${producto.id}`}>Editar</Link>
        </td>
        <td>
          <button
            className="button"
            onClick={() => eliminarProducto(producto.referencia)}
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
