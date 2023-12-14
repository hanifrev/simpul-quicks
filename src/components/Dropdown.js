import React, { useState } from "react";

const CustomDropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div id="dropdown" className="dropdown  text-black">
      <div
        className="dropdown-toggle ml-[84.23px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* {selectedOption ? selectedOption.label : "My Task"} */}
        My Task
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
