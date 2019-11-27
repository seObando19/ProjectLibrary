import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Swal from 'sweetalert2'

// Components
import { RowForm, Error } from './index'

// Hooks
import { useFormInput } from '../hooks/useFormInput'
// import { usePOST producto} from '../hooks/usePOST'

const FormIngresar = ({ history }) => {
  const [error, setError] = useState(false)
  const referencia = useFormInput('')
  const nombre = useFormInput('')
  const observaciones = useFormInput('')
  const precio = useFormInput('')
  const impuesto = useFormInput('')
  const cantidad = useFormInput('')
  const estado = useFormInput('Activo')
  const imagen = useFormInput('')

  const Referencia = () => {
    return (
      <div className="field">
        <label className="label">
          Referencia {referencia.value === '' ? '👁' : '✔'}
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="1b02"
            maxLength="10"
            required
            {...referencia}
          />
        </div>
      </div>
    )
  }

  const Nombre = () => {
    return (
      <div className="field">
        <label className="label">
          Nombre {nombre.value === '' ? '👁' : '✔'}
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="PS4"
            required
            pattern="[A-Za-z]+"
            maxLength="50"
            {...nombre}
          />
        </div>
      </div>
    )
  }

  const Observaciones = () => {
    return (
      <Fragment>
        <label className="label">
          Observaciones {observaciones.value === '' ? '👁' : '✔'}
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Consola de videojuegos"
            required
            pattern="[A-Za-z]+"
            {...observaciones}
          />
        </div>
      </Fragment>
    )
  }

  const Precio = () => {
    return (
      <div className="field">
        <label className="label">
          Precio {precio.value === '' ? '👁' : '✔'}
        </label>
        <div className="control">
          <input
            className="input"
            type="number"
            placeholder="$1100000"
            required
            maxLength="20"
            pattern="[0-9]+"
            {...precio}
          />
        </div>
      </div>
    )
  }

  const Impuesto = () => {
    return (
      <div className="field">
        <label className="label">
          Impuesto {impuesto.value === '' ? '👁' : '✔'}
        </label>
        <div className="control">
          <input
            className="input"
            type="number"
            placeholder="18"
            required
            pattern="[0-9]+"
            {...impuesto}
          />
        </div>
      </div>
    )
  }

  const Cantidad = () => {
    return (
      <div className="field">
        <label className="label">
          Cantidad {cantidad.value === '' ? '👁' : '✔'}
        </label>
        <div className="control">
          <input
            className="input"
            type="number"
            placeholder="1"
            maxLength="4"
            required
            pattern="[0-9]+"
            {...cantidad}
          />
        </div>
      </div>
    )
  }

  const Estado = () => {
    return (
      <div className="field">
        <label className="label">
          Estado {estado.value === '' ? '👁' : '✔'}
        </label>
        <div className="select">
          <select {...estado}>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>
      </div>
    )
  }

  const Imagen = () => {
    return (
      <div className="field">
        <label className="label">
          Imagen {imagen.value === '' ? '👁' : '✔'}
        </label>
        <div className="control">
          <input className="input" type="file" placeholder="img" {...imagen} />
        </div>
      </div>
    )
  }

  const botonRegistrar = () => {
    return (
      <div className="field">
        <div className="control">
          <input
            type="submit"
            className="button is-light is-normal is-fullwidth is-inverted is-outlined"
            value="Ingresar"
          />
        </div>
      </div>
    )
  }

  const insertarRegistro = async e => {
    e.preventDefault()
    if (
      referencia.value === '' ||
      nombre.value === '' ||
      precio.value === '' ||
      impuesto.value === '' ||
      cantidad.value === '' ||
      imagen.value === ''
    ) {
      return setError(true)
    }
    setError(false)

    const producto = {
      referencia: referencia.value,
      nombre: nombre.value,
      observaciones: observaciones.value,
      precio: precio.value,
      impuesto: impuesto.value,
      cantidad: cantidad.value,
      estado: estado.value,
      imagen: imagen.value,
    }

    fetch('http://localhost:8089/prueba-aveonline/crud-php/producto.php/', {
      method: 'POST',
      headers: {
        // 'Accept': 'multipart/form-data',
        // 'Content-Type': 'application/json'
        'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify(producto),
    })
      .then(res => {
        console.log(res)
        if (res.statusText === 'OK') {
          Swal.fire({
            type: 'success',
            title: 'Producto creado',
            text: 'Se inserto correctamente',
          })
        }
        // Redirigir al usuario
        history.push('/productos')
      })
      .catch(err => {
        console.log(err.message)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Hubo un error, verifica',
        })
      })
  }

  return (
    <Fragment>
      {error ? <Error mensaje={'Todos los campos son obligatorios'} /> : null}
      <form onSubmit={insertarRegistro}>
        <RowForm>
          <div className="column is-4"> {Referencia()} </div>
          <div className="column is-4"> {Nombre()} </div>
          <div className="column is-4"> {Precio()} </div>
        </RowForm>
        <RowForm>
          <div className="column is-4"> {Impuesto()} </div>
          <div className="column is-4"> {Cantidad()} </div>
          <div className="column is-4"> {Estado()} </div>
        </RowForm>
        <RowForm>
          <div className="column is-6"> {Imagen()} </div>
          <div className="column is-6"> {Observaciones()} </div>
        </RowForm>
        <br />
        <br />
        <RowForm>
          <div className="column is-offset-4 is-4">{botonRegistrar()} </div>
        </RowForm>
      </form>
    </Fragment>
  )
}

export default withRouter(FormIngresar)
