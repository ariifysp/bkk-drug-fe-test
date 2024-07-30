import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  Typography,
  Grid,
  IconButton,
  Button,
  ButtonGroup,
} from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline  } from '@mui/icons-material'
import CustomCard from '../../components/card/card'

import { RootState } from '../../store'
import { increaseQuantity, decreaseQuantity, clearCart } from '../../store/reducers/product-slice'
import { setBranch } from '../../store/reducers/branch-slice'
import { fetchBranchNearBy } from '../../services/branch'
import { Branch, ParamsFetchBranchNearBy } from '../../interfaces'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useSelector((state: RootState) => state.location.location)
  const address = useSelector((state: RootState) => state.location.address)
  const products = useSelector((state: RootState) => state.product.products)

  useEffect(() => {
    if (!address) {
      navigate('/')
    }
  }, [address, navigate])

  const submitOrder = async () => {
    const params: ParamsFetchBranchNearBy = {
      location: location,
      page: 1,
      size: 5,
    }
    const branches: Branch[] = await fetchBranchNearBy(params)
    dispatch(setBranch(branches))
    navigate('/select-branch')
  }

  return (
    <Container>
      <Grid className='mt-5' container>
        <Grid item columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          <Typography>สั่งซื้อสินค้า</Typography>
        </Grid>
      </Grid>

      <Grid className='mt-5 justify-center'>
        <Grid item columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          <CustomCard>
            <Typography>ที่อยู่</Typography>
            <Typography>{address}</Typography>
          </CustomCard>
        </Grid>
      </Grid>

      <Grid className='mt-5 justify-center'>
        <Grid item columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          <CustomCard>
            <div className='flex justify-between'>
              <Typography>สินค้า</Typography>
              <Button variant="outlined" onClick={() => dispatch(clearCart())}>ลบทั้งหมด</Button>
            </div>
            {products.length > 0 && products.map(item => (
              <Grid className='mt-3' key={item.productId}>
                <CustomCard>
                  <div className='flex justify-between items-center'>
                    <div className='flex'>
                      <img className='mr-3' src={item.image} alt={item.productName}/>
                      <Typography>{item.productName}</Typography>
                    </div>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                      <IconButton onClick={() => dispatch(decreaseQuantity(item.productId))}>
                        <RemoveCircleOutline className='text-cyan-500'/>
                      </IconButton>
                      <Typography className='flex p-3 items-center' variant="body1">
                        {item.quantity}
                      </Typography>
                      <IconButton onClick={() => dispatch(increaseQuantity(item.productId))}>
                        <AddCircleOutline className='text-cyan-500'/>
                      </IconButton>
                    </ButtonGroup>
                  </div>
                </CustomCard>
              </Grid>
            ))}
          </CustomCard>
        </Grid>
      </Grid>

      <Grid className='mt-5 flex justify-center'>
        <Grid item columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          <Button variant="contained" onClick={submitOrder}>สั่งซื้อสินค้า</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart