import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'

const CustomStyleCard = styled(Card)({
  border: '1px solid #E7E7E7',
  borderRadius: '12px',
  boxShadow: 'none'
})

const CustomCard = (props: any) => {
  const { children } = props
  return (
    <CustomStyleCard>
      <CardContent>
        {children}
      </CardContent>
    </CustomStyleCard>
  )
}

export default CustomCard