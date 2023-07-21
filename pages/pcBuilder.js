import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessages } from '../redux/chatSlice';
import { clearParts } from '../redux/partSlice';
import axios from 'axios';
import Header from '../components/header';
import usePart from './usePart';
import PartSelect from './partSelect';
import MiniChat from '../components/miniChat';

function PcBuilder() {
  const cpu = usePart('CPU');
  const gpu = usePart('GPU');
  const ram = usePart('RAM');
  const ssd = usePart('SSD');
  const hdd = usePart('HDD');
  const usb = usePart('USB');
  const selectedParts = [cpu.selectedPart, gpu.selectedPart, ram.selectedPart, ssd.selectedPart, hdd.selectedPart, usb.selectedPart];
  
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  const handleSendPartsList = () => {
    let partsMessage = "The user has selected the following parts:\n";

    for (const part of selectedParts) {
      if (part) {
        partsMessage += `- ${part.Brand} ${part.Model}\n`;
      }
    }

    dispatch(addMessages([{ role: 'user', content: partsMessage }]));

    // New code: send the messages to the server
    axios.post('/api/chat', { messages: [...messages, { role: 'user', content: partsMessage }] })
      .then(response => {
        const aiMessageContent = response.data.messages[response.data.messages.length - 1].content;
        const aiMessage = { role: 'assistant', content: aiMessageContent };
        dispatch(addMessages([aiMessage]));
      })
      .catch(error => {
        console.error('An error occurred while sending the message:', error);
      });
  };

  const handleClearPartsList = () => {
    dispatch(clearParts());

    localStorage.removeItem('CPU');
    localStorage.removeItem('GPU');
    localStorage.removeItem('RAM');
    localStorage.removeItem('SSD');
    localStorage.removeItem('HDD');
    localStorage.removeItem('USB');
  };  

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="flex justify-center items-top h-screen">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 flex flex-col items-end space-y-4">
              <PartSelect partType="CPU" partData={cpu} />
              <PartSelect partType="GPU" partData={gpu} />
            </div>

            <div className="col-span-1 flex flex-col space-y-4 items-center">
              <PartSelect partType="RAM" partData={ram} />
              {/* Center Column: Place PC Image Here */}
              <img src="/path-to-image.jpg" alt="PC Image" className="w-64 h-64" />
              <PartSelect partType="SSD" partData={ssd} />
            </div>

            <div className="col-span-1 flex flex-col items-start space-y-4">
              <PartSelect partType="HDD" partData={hdd} />
              <PartSelect partType="USB" partData={usb} />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-4 mb-2">Selected Parts:</h2>
        <ul className="list-disc pl-5">
          {selectedParts.map(part => part && (
            <li key={part._id} className="mb-1">
              {part.Brand} {part.Model} - ${part.Price}
            </li>
          ))}
        </ul>
        <button 
          onClick={handleSendPartsList} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send parts list to AI
        </button>

        <button 
          onClick={handleClearPartsList} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          Clear parts list
        </button>
        <MiniChat />
      </div>
    </>
  );
}

export default PcBuilder;