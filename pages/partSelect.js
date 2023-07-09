import React from 'react';

// This component is the part select component.
function PartSelect({ partType, partData }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-1">{partType}:</h2>
      <select className="w-full p-2 border rounded" onChange={(e) => partData.onPartSelect(JSON.parse(e.target.value))}>
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
