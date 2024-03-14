"use client"
// components/Dropdown.js
import { useState } from 'react';

const Dropdown = ({ sections }) => {
  const [openSectionIndex, setOpenSectionIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenSectionIndex(openSectionIndex === index ? null : index);
  };

  return (
    <div className="dropdown relative">
      <div className="flex">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col mr-4">
            <div className="dropdown-heading text-white font-bold py-2 px-4 cursor-pointer" onClick={() => toggleSection(index)}>
              {section.heading}
            </div>
            {openSectionIndex === index && (
              <div className="dropdown-content absolute bg-gray-100 border border-gray-300 py-2 px-0 w-full">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="dropdown-item py-2 px-4 cursor-pointer hover:bg-gray-200">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
