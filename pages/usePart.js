import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import the necessary hooks from react-redux
import { selectPart } from '../redux/partSlice'; // Import the selectPart action

// This custom hook fetches a list of parts from the server.
const usePart = (partType) => {
  const [partList, setPartList] = useState([]);
  const [error, setError] = useState(null);

  // Get the selected part from the Redux store
  const selectedPart = useSelector(state => state.selectedParts[partType]);

  // Initialize the dispatch function
  const dispatch = useDispatch();

  // Fetch the list of parts from the server.
  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await fetch(`/api/parts/${partType}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPartList(data);
      } catch (err) {
        console.error(`Failed to fetch parts: ${err}`);
        setError(err.message);
      }
    };
  
    fetchParts();
  }, [partType]);

  // This function is called when a part is selected.
  const onPartSelect = (part) => {
    // Update the selected part in the Redux store
    dispatch(selectPart({ partType, part }));
  };

  return { partList, selectedPart, onPartSelect, error };
};

export default usePart;
