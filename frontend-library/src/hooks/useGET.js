import { useState, useEffect } from 'react'
import axios from 'axios'

export const useGET = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `http://localhost:4000/libros`

      await axios
        .get(url)
        .then(res => {
          console.log(res)
          if (res.data.data.length === 0) {
            return null
          } else {
            setProductos(res.data.data)
          }
        })
        .catch(err => err.message)
    }
    consultarAPI()
  }, [])

  return { productos }
}
