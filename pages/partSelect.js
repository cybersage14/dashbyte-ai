import React from 'react';
import { useDispatch } from 'react-redux'; // Import the useDispatch hook
import { selectPart } from '../redux/partSlice'; // Import the selectPart action

// Create a component to display a part select dropdown
function PartSelect({ partType, partData }) {
  const dispatch = useDispatch(); // Initialize the dispatch function

  // Create a function to handle the part select event
  const handlePartSelect = (e) => {
    const selectedPart = JSON.parse(e.target.value); // Parse the selected part from the event target value
    partData.onPartSelect(selectedPart); // Call the onPartSelect function from the partData prop

    // Dispatch the selectPart action with the partType and selectedPart
    dispatch(selectPart({ partType, part: selectedPart }));
  };

  // Render the part select dropdown
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-1">{partType}:</h2>
      <select className="w-full p-2 border rounded text-black" onChange={handlePartSelect}>
        {partData.partList.map(part => (
          <option key={part._id} value={JSON.stringify(part)}>
            {part.Brand} {part.Model} - ${part.Price}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PartSelect;
