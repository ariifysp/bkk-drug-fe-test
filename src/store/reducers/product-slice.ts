import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ProductState } from '../../interfaces'

const initialState: ProductState = {
  products: [
    {
      productId: 1,
      productName: 'Acerola Cherry 1000 mg',
      image: 'images/image8.png',
      price: 250,
      quantity: 3,
    },
    {
      productId: 2,
      productName: 'Salmon Fish Oil 1000 mg',
      image: 'images/image7.png',
      price: 299,
      quantity: 2,
    }
  ]
}

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    increaseQuantity(state, action: PayloadAction<number>) {
      for (const product of state.products) {
        if (product.productId === action.payload) {
          product.quantity += 1
          break
        }
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      let isRemoveProduct: boolean = false
      for (const product of state.products) {
        if (product.productId === action.payload) {
          product.quantity -= 1
          if (product.quantity === 0) isRemoveProduct = true
          break
        }
      }
      if (isRemoveProduct) {
        state.products = state.products.filter(product => product.productId !== action.payload)
      }
    },
    clearCart(state) {
      state.products = []
    }
  },
})

export const { increaseQuantity, decreaseQuantity, clearCart } = productSlice.actions
export default productSlice.reducer