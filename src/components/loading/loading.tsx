import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export const Loading = () => {
  return (
    <Backdrop open invisible sx={{ zIndex: '10' }}>
      <CircularProgress color="primary" />
    </Backdrop>
  )
}
