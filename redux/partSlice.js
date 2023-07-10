import { createSlice } from '@reduxjs/toolkit'

const selectedPartsSlice = createSlice({
  name: 'selectedParts',
  initialState: {},
  reducers: {
    selectPart: (state, action) => {
      state[action.payload.partType] = action.payload.part;
    },
    clearParts: (state) => {
      return {};
    },
  },
})

export const { selectPart, clearParts } = selectedPartsSlice.actions
export default selectedPartsSlice.reducer
