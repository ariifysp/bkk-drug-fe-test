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
import { ParamsFetchBranchNearBy, ResponseBranch } from '../../shared/interfaces'

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
    const acerolaCherry1000mg = products.find(item => item.productId === 1) || null
    const salmonFish1000mg = products.find(item => item.productId === 2) || null
    const params: ParamsFetchBranchNearBy = {
      location: location,
      distance: 10000,
      page: 1,
      size: 5,
    }
    if (acerolaCherry1000mg) params.acerolaCherry1000mg = acerolaCherry1000mg.quantity
    if (salmonFish1000mg) params.salmonFish1000mg = salmonFish1000mg.quantity
    const data: ResponseBranch = await fetchBranchNearBy(params)
    if (data.branches.length > 0) {
      dispatch(setBranch(data.branches))
      navigate('/select-branch')
    }
  }

  return (
    <Container>
      <Grid className='mt-5' container>
        <Grid item columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          <Typography className='text-cyan-500' variant='h6'>สั่งซื้อสินค้า</Typography>
        </Grid>
      </Grid>

      <Grid className='mt-5 justify-center'>
        <Grid item columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          <CustomCard>
            <Typography className='text-[#6B6B6B]'><strong>ที่อยู่</strong></Typography>
            <div className='border-t border-[#E7E7E7] my-3'></div>
            <Typography className='text-[#6B6B6B]'>{address}</Typography>
          </CustomCard>
        </Grid>
      </Grid>

      <Grid className='mt-5 justify-center'>
        <Grid item columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          <CustomCard>
            <div className='flex justify-between'>
              <Typography><strong>สินค้า</strong></Typography>
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
                    <ButtonGroup className='bg-[#E4F2FC] text-[#222222] px-3 rounded-full' variant="outlined" aria-label="outlined button group">
                      <IconButton className='w-2' size='small' onClick={() => dispatch(decreaseQuantity(item.productId))}>
                        <RemoveCircleOutline className='text-cyan-500'/>
                      </IconButton>
                      <Typography className='flex px-3 items-center' variant="body1">
                        {item.quantity}
                      </Typography>
                      <IconButton className='w-2' size='small' onClick={() => dispatch(increaseQuantity(item.productId))}>
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

      <Grid className='mt-5'>
        <Grid columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          <Button fullWidth disabled={products.length === 0} variant="contained" onClick={submitOrder}>สั่งซื้อสินค้า</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart