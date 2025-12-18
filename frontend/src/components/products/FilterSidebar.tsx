import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi'; // Import a better dropdown icon
import { FaFolderOpen } from 'react-icons/fa';

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  // State to manage dropdown visibility for small screens
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="p-4 md:border-r border-gray-200 bg-white shadow-md md:min-h-screen">
      {/* Dropdown for small screens */}
      <div className="block md:hidden">
        <button
          className="w-full flex items-center justify-between text-left py-3 px-4 font-semibold border-2 border-gray-300 rounded-lg bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
          onClick={toggleDropdown}
        >
          <span className="text-gray-800 text-lg whitespace-nowrap">{selectedCategory}</span>
          <FiChevronDown
            className={`text-gray-500 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''
              }`}
            size={20}
          />
        </button>

        {isDropdownOpen && (
          <ul className="mt-3 border border-gray-200 rounded-lg bg-white shadow-lg">
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer py-3 px-4 transition-all duration-200 ease-in-out hover:bg-yellow-50 hover:text-yellow-600 whitespace-nowrap ${selectedCategory === category
                  ? 'font-semibold text-yellow-600 bg-gray-100 border-l-4 border-yellow-600'
                  : 'text-gray-700'
                  }`}
                onClick={() => {
                  onCategoryChange(category);
                  setIsDropdownOpen(false); // Close the dropdown on category selection
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sidebar for larger screens */}
      <div className="hidden md:block w-1/4 bg-white shadow-md rounded-xl p-4 min-h-screen">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 font-sans">
          Categories
        </h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer py-3 px-4 transition-colors duration-300 hover:text-yellow-600 hover:pl-4 px-2 rounded-md text-gray-800 font-sans text-lg flex items-center space-x-3 ${selectedCategory === category
                ? 'font-semibold text-yellow-500 border-l-4 border-yellow-500 bg-gray-100'
                : 'text-gray-700'
                }`}
              onClick={() => onCategoryChange(category)}
            >
              {/* Icon on the left side of the category */}
              <FaFolderOpen className="text-gray-500" size={18} />
              <span>{category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default FilterSidebar;
