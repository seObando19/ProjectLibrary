import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Swal from 'sweetalert2'

// Components
import { RowForm, Error } from './index'

// Hooks
import { useFormInput } from '../hooks/useFormInput'
// import { usePOST libro} from '../hooks/usePOST'

const FormIngresar = ({ history }) => {
  const [error, setError] = useState(false)
  const nombre = useFormInput('')
  const autor = useFormInput('')
  const genero = useFormInput('')
  const codigo = useFormInput('')
  const editorial = useFormInput('')
  const ano = useFormInput('')

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
            maxLength="10"
            required
            {...nombre}
          />
        </div>
      </div>
    )
  }

  const Autor = () => {
    return (
      <div className="field">
        <label className="label">Autor {autor.value === '' ? '👁' : '✔'}</label>
        <div className="control">
          <input
            className="input"
            type="text"
            required
            pattern="[A-Za-z]+"
            maxLength="50"
            {...autor}
          />
        </div>
      </div>
    )
  }

  const Genero = () => {
    return (
      <Fragment>
        <label className="label">
          Genero {genero.value === '' ? '👁' : '✔'}
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            required
            pattern="[A-Za-z]+"
            {...genero}
          />
        </div>
      </Fragment>
    )
  }

  const Codigo = () => {
    return (
      <div className="field">
        <label className="label">
          Codigo {codigo.value === '' ? '👁' : '✔'}
        </label>
        <div className="control">
          <input className="input" type="text" required {...codigo} />
        </div>
      </div>
    )
  }

  const Editorial = () => {
    return (
      <div className="field">
        <label className="label">
          Editorial {editorial.value === '' ? '👁' : '✔'}
        </label>
        <div className="control">
          <input className="input" type="text" required {...editorial} />
        </div>
      </div>
    )
  }

  const Ano = () => {
    return (
      <div className="field">
        <label className="label">Año {ano.value === '' ? '👁' : '✔'}</label>
        <div className="control">
          <input
            className="input"
            type="number"
            maxLength="4"
            required
            {...ano}
          />
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
      nombre.value === '' ||
      autor.value === '' ||
      genero.value === '' ||
      codigo.value === '' ||
      editorial.value === '' ||
      ano.value === ''
    ) {
      return setError(true)
    }
    setError(false)

    const libro = {
      nombre: nombre.value,
      autor: autor.value,
      genero: genero.value,
      codigo: codigo.value,
      editorial: editorial.value,
      ano: ano.value,
    }

    fetch('http://localhost:4000/add', {
      method: 'POST',
      headers: {
        // 'Accept': 'multipart/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(libro),
    })
      .then(res => {
        console.log(res)
        if (res.statusText === 'OK') {
          Swal.fire({
            type: 'success',
            title: 'Libro creado',
            text: 'Se inserto correctamente',
          })
        }
        // Redirigir al usuario
        history.push('/libros')
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
          <div className="column is-4"> {Nombre()} </div>
          <div className="column is-4"> {Autor()} </div>
          <div className="column is-4"> {Genero()} </div>
        </RowForm>
        <RowForm>
          <div className="column is-4"> {Codigo()} </div>
          <div className="column is-4"> {Editorial()} </div>
          <div className="column is-4"> {Ano()} </div>
        </RowForm>
        <RowForm>
          {/* <div className="column is-6"> {Imagen()} </div>
          <div className="column is-6"> {Observaciones()} </div> */}
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
