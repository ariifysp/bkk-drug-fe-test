import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LocationState, Location } from '../../shared/interfaces'

const initialState: LocationState = {
  location: {
    lat: 0,
    lng: 0,
  },
  address: '',
}

const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    setLocation(state, action: PayloadAction<Location>) {
      state.location = action.payload
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload
    },
  },
})

export const { setLocation, setAddress } = locationSlice.actions
export default locationSlice.reducer