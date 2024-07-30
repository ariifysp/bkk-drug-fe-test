import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  Typography,
  Grid,
} from '@mui/material'
import { FmdGood  } from '@mui/icons-material'
import CustomCard from '../../components/card/card'

import { RootState } from '../../store'
import { Branch } from '../../interfaces'

const SelectBranch = () => {
  const navigate = useNavigate()
  const address = useSelector((state: RootState) => state.location.address)
  const products = useSelector((state: RootState) => state.product.products)
  const branches = useSelector((state: RootState) => state.branch.branches)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)

  useEffect(() => {
    if (!address) {
      navigate('/')
    }
    setSelectedId(branches[0]?.site_id)
    setDistance(branches[0]?.distance)
  }, [address, navigate, branches])

  const selectBranch = (branch: Branch) => {
    setSelectedId(branch.site_id)
    setDistance(branch.distance)
  }

  return (
    <Container>
      <Grid className='mt-5' container>
        <Grid item columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          <Typography>ลำดับสาขา</Typography>
        </Grid>
      </Grid>

      <Grid className='mt-5 justify-center'>
        <Grid item columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          <CustomCard>
            <Typography>สินค้า</Typography>
            {products.length > 0 && products.map(item => (
              <Grid className='mt-3' key={item.productId}>
                <CustomCard>
                  <div className='flex justify-between items-center'>
                    <div className='flex'>
                      <img className='mr-3' src={item.image} alt={item.productName}/>
                      <Typography>{item.productName}</Typography>
                    </div>
                    <Typography variant="body1">
                      x {item.quantity}
                    </Typography>
                  </div>
                </CustomCard>
              </Grid>
            ))}
          </CustomCard>
        </Grid>
      </Grid>

      <Grid className='mt-5 justify-center'>
        <Grid item columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          {branches.length > 0 && branches.map((item, i) => (
            <div className='mt-5' key={item.site_id} onClick={() => selectBranch(item)}>
              <CustomCard>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <FmdGood className={`text-${item.site_id === selectedId ? 'red-600' : 'cyan-500'} mr-5`}/>
                    <Typography>สาขา {i + 1} :</Typography>
                  </div>
                  <Typography>{item.site_desc}</Typography>
                </div>
              </CustomCard>
            </div>
          ))}
        </Grid>
      </Grid>

      <Grid className='mt-5 justify-center'>
        <Grid item columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          <CustomCard>
            <Typography>ระยะทางทั้งหมด : {distance} กม.</Typography>
          </CustomCard>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SelectBranch