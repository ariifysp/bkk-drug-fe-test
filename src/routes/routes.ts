import loadable from '@loadable/component'

const Home = loadable(() => import('../pages/home/home'))
const Cart = loadable(() => import('../pages/cart/cart'))
const SelectBranch = loadable(() => import('../pages/branch/select-branch'))

const NotFound = loadable(() => import('../pages/error/not-found'))

const routes = [
  { component: NotFound, path: '*' },
  { component: Home, path: '' },
  { component: Cart, path: 'cart' },
  { component: SelectBranch, path: 'select-branch' },
]

export default routes