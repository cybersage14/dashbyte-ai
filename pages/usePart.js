import { useState, useEffect } from 'react';

// This custom hook fetches a list of parts from the server.
const usePart = (partType) => {
  const [partList, setPartList] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [error, setError] = useState(null);

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
    setSelectedPart(part);
  };

  return { partList, selectedPart, onPartSelect, error };
};

export default usePart;
