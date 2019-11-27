import React, { Fragment, useState, useEffect, useRef } from 'react'

import { withRouter } from 'react-router-dom'

import Swal from 'sweetalert2'

import { RowForm } from '../components/index'

// Hooks
import { useGET } from '../hooks/useGET'

const EditarProducto = ({ match, history }) => {
  // const [error, setError] = useState(false)

  const referenciaref = useRef()
  const nombreref = useRef()
  const observacionesref = useRef()
  const precioref = useRef()
  const impuestoref = useRef()
  const cantidadref = useRef()
  const estadoref = useRef()
  const imagenref = useRef()
  
  const [referencia, setReferencia] = useState('')
  const [nombre, setNombre] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [precio, setPrecio] = useState('')
  const [impuesto, setImpuesto] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [estado, setEstado] = useState('')
  const [imagen, setImagen] = useState('')

  const idProducto = match.params.id

  const { productos } = useGET()

  useEffect(() => {
    productos.map(producto => {
      if (idProducto === producto.id) {
        setReferencia(producto.referencia)
        setNombre(producto.nombre)
        setPrecio(producto.precio)
        setObservaciones(producto.observaciones)
        setImpuesto(producto.cantidad)
        setCantidad(producto.cantidad)
        setEstado(producto.estado)
        setImagen(producto.imagen)
      }
      return { referencia, nombre, precio, observaciones, impuesto, cantidad, estado, imagen }
    })
  })

  const Referencia = () => (
    <div className="field">
      <label className="label">
        Referencia {'✔'}
      </label>
      <div className="control">
        <input
          className="input"
          type="text"
          defaultValue={referencia}
          ref={referenciaref}
          disabled
        />
      </div>
    </div>
  )

  const Nombre = () => (
    <div className="field">
      <label className="label">
        Nombre {'✔'}
      </label>
      <div className="control">
        <input
          className="input"
          type="text"
          defaultValue={nombre}
          ref={nombreref}
          required
          pattern="[A-Za-z]+"
          maxLength="50"
        />
      </div>
    </div>
  )

  const Observaciones = () => (
    <Fragment>
      <label className="label">
        Observaciones {'✔'}
      </label>
      <div className="control">
        <input
          className="input"
          type="text"
          defaultValue={observaciones}
          ref={observacionesref}
          required
          pattern="[A-Za-z]+"
        />
      </div>
    </Fragment>
  )

  const Precio = () => (
    <div className="field">
      <label className="label">
        Precio {'✔'}
      </label>
      <div className="control">
        <input
          className="input"
          type="number"
          defaultValue={precio}
          ref={precioref}
          required
          maxLength="20"
          pattern="[0-9]+"
        />
      </div>
    </div>
  )

  const Impuesto = () => (
    <div className="field">
      <label className="label">
        Impuesto {'✔'}
      </label>
      <div className="control">
        <input
          className="input"
          type="number"
          defaultValue={impuesto}
          ref={impuestoref}
          required
          maxLength="2"
        />
      </div>
    </div>
  )

  const Cantidad = () => (
    <div className="field">
      <label className="label">
        Cantidad {'✔'}
      </label>
      <div className="control">
        <input
          className="input"
          type="number"
          defaultValue={cantidad}
          ref={cantidadref}
          maxLength="4"
          required
          pattern="[0-9]+"
        />
      </div>
    </div>
  )
  
  const Estado = () => (
    <div className="field">
      <label className="label">
        Estado {'✔'}
      </label>
      <div className="select">
        <select defaultValue={estado} ref={estadoref}>
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
      </div>
    </div>
  )
  

  const Imagen = () => (
    <div className="field">
      <label className="label">
        Imagen {'✔'}
      </label>
      <div className="control">
        <input
          className="input"
          type="file"
          placeholder="$20000"
          defaultValue={imagen}
          ref={imagenref}
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
      referencia: referencia,
      nombre: nombreref.current.value,
      observaciones: observacionesref.current.value,
      precio: precioref.current.value,
      impuesto: impuestoref.current.value,
      cantidad: cantidadref.current.value,
      estado: estadoref.current.value,
      imagen: imagenref.current.value
    }

    
    
    fetch(`http://localhost:8089/prueba-aveonline/crud-php/producto.php/?referencia=${referencia}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editarProducto)
    }).then((res) => {
        console.log(res)
          if (res.statusText === 'OK') {
            Swal.fire({
              type: 'success',
              title: 'Producto Actualizado',
              text: 'Se actualizo correctamente',
            })
          }
          // Redirigir al usuario
          history.push('/productos')
        })
        .catch((err) => {
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
      <h1 className="title has-text-centered"> Editar producto </h1>
        <form onSubmit={editarRegistro}>
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
          <br/><br/>
          <RowForm>        
            <div className="column is-offset-4 is-4">{botonEditar()} </div>  
          </RowForm>
        </form>      
    </Fragment>
  )
}

export default withRouter(EditarProducto)
