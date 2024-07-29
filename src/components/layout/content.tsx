import Container from '@mui/material/Container'

const Content = ({children}: any) => {
  return (
    <main>
      <Container>
        {children}
      </Container>
    </main>
  )
}

export default Content