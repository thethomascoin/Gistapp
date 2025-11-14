import React from 'react';
import { X, Trash2 } from 'lucide-react';

interface SelectionHeaderProps {
  selectedCount: number;
  onExit: () => void;
  onDelete: () => void;
}

const SelectionHeader: React.FC<SelectionHeaderProps> = ({ selectedCount, onExit, onDelete }) => {
  return (
    <div className="bg-white h-16 flex items-center justify-between px-4 border-b border-gray-200 animate-fade-in">
      <div className="flex items-center gap-4">
        <button onClick={onExit} className="text-gray-600 hover:bg-gray-100 rounded-full p-2">
          <X size={24} />
        </button>
        <span className="text-lg font-medium text-gray-800">{selectedCount} selected</span>
      </div>
      <button onClick={onDelete} className="text-gray-600 hover:bg-gray-100 rounded-full p-2">
        <Trash2 size={22} />
      </button>
    </div>
  );
};

export default SelectionHeader;