import { createSlice } from '@reduxjs/toolkit'

// Create the selected parts slice
const selectedPartsSlice = createSlice({
  name: 'selectedParts',
  initialState: {},
  reducers: {
    // Add the selectPart action to the slice
    selectPart: (state, action) => {
      // Create a copy of the state
      const newState = { ...state };
    
      // Add the selected part to the new state
      newState[action.payload.partType] = action.payload.part;
    
      // Log the action and the updated state
      console.log("Dispatching selectPart action with payload:", action.payload);
      console.log("Updated state:", newState);
    
      return newState;
    },    
    // Add the clearParts action to the slice
    clearParts: (state) => {
      // Clear the state
      const newState = {};

      // Log the action and the updated state
      console.log("Dispatching clearParts action");
      console.log("Updated state:", newState);

      return newState;
    },
  },
})

export const { selectPart, clearParts } = selectedPartsSlice.actions // Export the actions
export default selectedPartsSlice.reducer  // Export the reducer
