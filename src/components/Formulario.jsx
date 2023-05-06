import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import Error from "./Error"
import useSelectMonedas from "../hooks/useSelectMonedas"
import { monedas } from "../data/monedas"


// Styled Components //
const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`
// ---------------- //

// Componente Fromulario //
const Formulario = ( {setMonedas} ) => {

  const [ criptos, setCriptos ] = useState([])
  const [ error, setError ] = useState(false)

  const [ moneda, SelectMoneda ] = useSelectMonedas('Elige tu Moneda', monedas)
  const [ criptomoneda, SelectCriptomonedea] = useSelectMonedas('Elige tu Criptomoneda', criptos)

  useEffect( () => {
    const consultarAPI =  async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      
      const arrayCrioptos = resultado.Data.map( cripto => {

        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        
        return objeto

      } )

      setCriptos(arrayCrioptos)

    }

    consultarAPI();

  }, [])

  // Validacion de Formulario //
  const handleSubmit = event => {
    event.preventDefault()

    if([ moneda, criptomoneda ].includes('')) {
      
      setError(true)

      return
    }

    setError(false)
    setMonedas({
      moneda,
      criptomoneda
    })

  }
  // ----------------------- //


  return (

    <>
      { error && <Error>Todos los campos son obligatorios</Error> }

      <form
        onSubmit={ handleSubmit }
      >

        <SelectMoneda />
        <SelectCriptomonedea/>


        <InputSubmit 
            type="submit" 
            value="Cotizar" 
        />

      </form>
    </>

  )
}

export default Formulario

// ---------------- //

