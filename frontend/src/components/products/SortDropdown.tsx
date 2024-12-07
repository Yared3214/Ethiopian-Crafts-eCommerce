import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortDropdownProps {
  sortOption: string;
  onSortChange: (sortOption: string) => void; // Function to handle sort option change
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortOption, onSortChange }) => {
  // Handle value change and call the parent's onSortChange
  const handleSortChange = (newSortOption: string) => {
    console.log("selected option", newSortOption);
    // Call the onSortChange function passed down from the parent
    onSortChange(newSortOption);
  };

  return (
    <div className="flex justify-end mb-4 items-center space-x-4">
      {/* Label Styling */}
      <label
        htmlFor="sort"
        className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300"
      >
        Sort by:
      </label>

      {/* Select Dropdown Styling */}
      <Select value={sortOption} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px] p-3 pr-8 pl-6 border-2 border-gray-300 rounded-lg text-gray-700 font-medium bg-white dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition-all duration-300 shadow-md dark:border-gray-600">
          <SelectValue placeholder="Price (Low to High)" />
        </SelectTrigger>
        <SelectContent className="max-h-72 overflow-auto rounded-lg bg-white dark:bg-zinc-800 shadow-lg">
          <SelectItem
            value="price-asc"
            className="text-gray-700 dark:text-white hover:opacity-80 transition-opacity duration-200"
          >
            Price (Low to High)
          </SelectItem>
          <SelectItem
            value="price-desc"
            className="text-gray-700 dark:text-white hover:opacity-80 transition-opacity duration-200"
          >
            Price (High to Low)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortDropdown;
