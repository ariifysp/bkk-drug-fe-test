import { Routes, Route } from 'react-router-dom'
import routes from './routes'
import BaseLayout from '../components/layout/layout'

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({path, component: Component}: any, i: number) => {
        const element = (
          <BaseLayout>
            <Component/>
          </BaseLayout>
        )
        return (
          <Route key={i} path={path} element={element}/>
        )
      })}
    </Routes>
  )
}

export default AppRoutes