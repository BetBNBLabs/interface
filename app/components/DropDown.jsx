"use client";
// components/Dropdown.js
import { useState } from "react";

const Dropdown = ({ sections }) => {
  const [openSectionIndex, setOpenSectionIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenSectionIndex(openSectionIndex === index ? null : index);
  };

  return (
    <div className="dropdown bg-black glass-container rounded-lg absolute md:left-[55%] lg:left-[70%] mt-12">
      <div className="flex">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col mr-4">
            <div
              className="dropdown-heading text-white font-bold py-2 px-4 cursor-pointer"
              onClick={() => toggleSection(index)}
            >
              {section.heading}
            </div>
            {openSectionIndex === index && (
              <div className="dropdown-content text-white glass-container rounded-lg absolute py-2 px-0 w-[70%] top-[95%]">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="dropdown-item py-2 px-4 cursor-pointer "
                  >
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