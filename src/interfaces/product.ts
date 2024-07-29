export interface Product {
  productId: number
  productName: string
  image: string
  price: number
  quantity: number
}

export interface ProductState {
  products: Product[]
}