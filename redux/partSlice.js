import { createSlice } from '@reduxjs/toolkit'

// Create the selected parts slice
const selectedPartsSlice = createSlice({
  name: 'selectedParts',
  initialState: {},
  reducers: {
    // Add the selectPart action to the slice
    selectPart: (state, action) => {
      // Add the selected part to the state
      state[action.payload.partType] = action.payload.part;
    },
    // Add the clearParts action to the slice
    clearParts: (state) => {
      return {};
    },
  },
})

export const { selectPart, clearParts } = selectedPartsSlice.actions // Export the actions
export default selectedPartsSlice.reducer  // Export the reducer
