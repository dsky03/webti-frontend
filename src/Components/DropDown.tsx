import React, { useState } from "react";

const Dropdown: React.FC<{ onCommand: (command: string) => void }> = ({
  onCommand,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCommand = (command: string) => {
    onCommand(command);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* 드롭 다운 */}
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-white-300 px-4 py-2 bg-black text-sm font-medium text-white-700 hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          &#9660;
        </button>
      </div>
      {/* 버튼 열었을 때 */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={() => handleCommand("start")}
              className="block px-4 py-2 text-sm text-white-700 border border-white hover:bg-gray-100 w-full text-left"
            >
              Start
            </button>
            <button
              onClick={() => handleCommand("about")}
              className="block px-4 py-2 text-sm text-white-700 border border-white hover:bg-gray-100 w-full text-left"
            >
              About
            </button>
            <button
              onClick={() => handleCommand("help")}
              className="block px-4 py-2 text-sm text-white-700 border border-white hover:bg-gray-100 w-full text-left"
            >
              Help
            </button>
            <button
              onClick={() => handleCommand("clear")}
              className="block px-4 py-2 text-sm text-white-700 border border-white hover:bg-gray-100 w-full text-left"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
