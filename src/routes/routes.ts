import loadable from '@loadable/component'

const Home = loadable(() => import('../pages/home/home'))
const Cart = loadable(() => import('../pages/cart/cart'))

const NotFound = loadable(() => import('../pages/error/not-found'))

const routes = [
  { component: NotFound, path: '*' },
  { component: Home, path: '' },
  { component: Cart, path: 'cart' },
]

export default routes