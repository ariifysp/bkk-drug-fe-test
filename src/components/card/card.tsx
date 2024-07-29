import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const CustomCard = (props: any) => {
  const { children } = props
  return (
    <Card>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default CustomCard