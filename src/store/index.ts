import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import locationReducer from './reducers/location-slice'

const rooteReducer = combineReducers({
  location: locationReducer
})

const store = configureStore({
  reducer: rooteReducer
})

export type RootState = ReturnType<typeof store.getState>
export default store