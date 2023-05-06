import styled from "@emotion/styled"

// Styled Components //
const MensajeError = styled.div`
  background-color: #b7322c;
  color: #FFF;
  padding: 15px;
  font-size: 18px;
  text-transform: uppercase;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  text-align: center;
  border-radius: 5px;
`
// ---------------- //

const Error = ({ children }) => {
  return (
    <MensajeError>
      {children}
    </MensajeError>
  )
}

export default Error