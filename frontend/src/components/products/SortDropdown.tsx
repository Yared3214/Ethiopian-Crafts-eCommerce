import React from 'react';

interface SortDropdownProps {
  sortOption: string;
  onSortChange: (sortOption: string) => void;
}


const SortDropdown: React.FC<SortDropdownProps> = ({ sortOption, onSortChange }) => {
  return (
    <div className="flex justify-end mb-4 items-center">
      {/* Label Styling */}
      <label htmlFor="sort" className="mr-2 text-lg font-semibold text-gray-700">
        Sort by:
      </label>
      
      {/* Select Dropdown Styling */}
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="p-2 border-2 cursor-pointer border-gray-300 rounded-lg text-gray-700 font-medium bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400 transition-all duration-300"
      >
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </div>
  );
};

export default SortDropdown;
