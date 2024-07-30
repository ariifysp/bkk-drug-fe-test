import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Branch, BranchState } from '../../interfaces/branch'

const initialState: BranchState = {
  branches: []
}

const branchSlice = createSlice({
  name: 'branch',
  initialState: initialState,
  reducers: {
    setBranch(state, action: PayloadAction<Branch[]>) {
      state.branches = action.payload
    }
  }
})

export const { setBranch } = branchSlice.actions
export default branchSlice.reducer