import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import locationReducer from './reducers/location-slice'
import productReducer from './reducers/product-slice'

const rooteReducer = combineReducers({
  location: locationReducer,
  product: productReducer,
})

const store = configureStore({
  reducer: rooteReducer
})

export type RootState = ReturnType<typeof store.getState>
export default store