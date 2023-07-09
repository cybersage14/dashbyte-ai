import React from 'react';
import Header from '../components/header';
import usePart from './usePart';
import PartSelect from './partSelect';

// This component is the PC builder page.
function PcBuilder() {
  const cpu = usePart('CPU');
  const gpu = usePart('GPU');
  const ram = usePart('RAM');
  const ssd = usePart('SSD');
  const hdd = usePart('HDD');
  const usb = usePart('USB');
  const selectedParts = [cpu.selectedPart, gpu.selectedPart, ram.selectedPart, ssd.selectedPart, hdd.selectedPart, usb.selectedPart];

  return (
    <>
    <Header />
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-4">PC Builder Page</h1>
        <p className="text-lg mb-4">Select parts to build your PC:</p>
        <PartSelect partType="CPU" partData={cpu} />
        <PartSelect partType="GPU" partData={gpu} />
        <PartSelect partType="RAM" partData={ram} />
        <PartSelect partType="SSD" partData={ssd} />
        <PartSelect partType="HDD" partData={hdd} />
        <PartSelect partType="USB" partData={usb} />
        <h2 className="text-2xl font-bold mt-4 mb-2">Selected Parts:</h2>
        <ul className="list-disc pl-5">
          {selectedParts.map(part => part && (
            <li key={part._id} className="mb-1">
              {part.Brand} {part.Model} - ${part.Price}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default PcBuilder;
