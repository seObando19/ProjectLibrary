import React, { Fragment, useState, useEffect, useRef } from 'react'

import { withRouter } from 'react-router-dom'

import Swal from 'sweetalert2'

import { RowForm } from '../components/index'

// Hooks
import { useGET } from '../hooks/useGET'

const EditarProducto = ({ match, history }) => {
  // const [error, setError] = useState(false)

  const idref = useRef()
  const nombreref = useRef()
  const autorref = useRef()
  const generoref = useRef()
  const codigoref = useRef()
  const editorialref = useRef()
  const anoref = useRef()

  const [id, setID] = useState('')
  const [nombre, setNombre] = useState('')
  const [autor, setAutor] = useState('')
  const [genero, setGenero] = useState('')
  const [codigo, setCodigo] = useState('')
  const [editorial, setEditorial] = useState('')
  const [ano, setAno] = useState('')

  const idProducto = match.params.id

  const { productos } = useGET()

  useEffect(() => {
    productos.map(producto => {
      if (idProducto === producto._id) {
        setID(producto._id)
        setNombre(producto.nombre)
        setAutor(producto.autor)
        setGenero(producto.genero)
        setCodigo(producto.codigo)
        setEditorial(producto.editorial)
        setAno(producto.ano)
      }
      return {
        id,
        nombre,
        autor,
        genero,
        codigo,
        editorial,
        ano,
      }
    })
  })

  const ID = () => (
    <div className="field">
      <label className="label">ID {'✔'}</label>
      <div className="control">
        <input className="input" type="text" defaultValue={id} disabled />
      </div>
    </div>
  )

  const Nombre = () => (
    <div className="field">
      <label className="label">Nombre {'✔'}</label>
      <div className="control">
        <input
          className="input"
          type="text"
          defaultValue={nombre}
          ref={nombreref}
        />
      </div>
    </div>
  )

  const Autor = () => (
    <div className="field">
      <label className="label">Autor {'✔'}</label>
      <div className="control">
        <input
          className="input"
          type="text"
          defaultValue={autor}
          ref={autorref}
          required
          pattern="[A-Za-z]+"
          maxLength="50"
        />
      </div>
    </div>
  )

  const Genero = () => (
    <Fragment>
      <label className="label">Genero {'✔'}</label>
      <div className="control">
        <input
          className="input"
          type="text"
          defaultValue={genero}
          ref={generoref}
          required
          pattern="[A-Za-z]+"
        />
      </div>
    </Fragment>
  )

  const Codigo = () => (
    <div className="field">
      <label className="label">Código {'✔'}</label>
      <div className="control">
        <input
          className="input"
          type="number"
          defaultValue={codigo}
          ref={codigoref}
          required
          maxLength="20"
        />
      </div>
    </div>
  )

  const Editorial = () => (
    <div className="field">
      <label className="label">Editorial {'✔'}</label>
      <div className="control">
        <input
          className="input"
          type="text"
          defaultValue={editorial}
          ref={editorialref}
          required
        />
      </div>
    </div>
  )

  const Ano = () => (
    <div className="field">
      <label className="label">Año {'✔'}</label>
      <div className="control">
        <input
          className="input"
          type="number"
          defaultValue={ano}
          ref={anoref}
          maxLength="4"
          required
          pattern="[0-9]+"
        />
      </div>
    </div>
  )

  const botonEditar = () => {
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

  const editarRegistro = e => {
    e.preventDefault()

    const editarProducto = {
      nombre: nombre.current.value,
      autor: autorref.current.value,
      genero: generoref.current.value,
      codigo: codigoref.current.value,
      editorial: editorialref.current.value,
      ano: ano.current.value,
    }

    console.log(id)

    fetch(`http://localhost:4000/edit/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editarProducto),
    })
      .then(res => {
        console.log(res)
        if (res.statusText === 'OK') {
          Swal.fire({
            type: 'success',
            title: 'Libro Actualizado',
            text: 'Se actualizo correctamente',
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
      {/* {error ? <Error mensaje={'Todos los campos son obligatorios'} /> : null} */}
      <h1 className="title has-text-centered"> Editar Libro </h1>
      <form onSubmit={editarRegistro}>
        <RowForm>
          <div className="column is-4"> {ID()} </div>
        </RowForm>
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
          <div className="column is-offset-4 is-4">{botonEditar()} </div>
        </RowForm>
      </form>
    </Fragment>
  )
}

export default withRouter(EditarProducto)
