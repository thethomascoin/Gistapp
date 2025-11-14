import React, { useState } from 'react';
import { User } from '../types';
import LibraryItemCard from './LibraryItemCard';
import SelectionHeader from './SelectionHeader';
import { Search, Library as LibraryIcon } from 'lucide-react';

interface LibraryProps {
  user: User;
  onDeleteItems: (itemIds: string[]) => void;
}

const Library: React.FC<LibraryProps> = ({ user, onDeleteItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  const filteredItems = user.libraryItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleStartSelection = (itemId: string) => {
    setIsSelectionMode(true);
    setSelectedItemIds([itemId]);
  };

  const handleToggleSelection = (itemId: string) => {
    const newSelection = selectedItemIds.includes(itemId)
      ? selectedItemIds.filter(id => id !== itemId)
      : [...selectedItemIds, itemId];
    
    if (newSelection.length === 0) {
      setIsSelectionMode(false);
    }
    setSelectedItemIds(newSelection);
  };

  const handleExitSelection = () => {
    setIsSelectionMode(false);
    setSelectedItemIds([]);
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedItemIds.length} item(s)? This cannot be undone.`)) {
      onDeleteItems(selectedItemIds);
      handleExitSelection();
    }
  };


  return (
    <div>
      {isSelectionMode ? (
        <SelectionHeader 
          selectedCount={selectedItemIds.length}
          onExit={handleExitSelection}
          onDelete={handleDeleteSelected}
        />
      ) : (
        <div className="p-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
                </div>
                <input
                type="text"
                placeholder="Search your library..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-100 border border-transparent rounded-full focus:ring-2 focus:ring-brand-primary/50 focus:outline-none focus:bg-white transition-colors"
                />
            </div>
        </div>
      )}

      <div className="space-y-3 px-4 pb-4">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => 
            <LibraryItemCard 
              key={item.id} 
              item={item}
              isSelectionMode={isSelectionMode}
              isSelected={selectedItemIds.includes(item.id)}
              onStartSelection={handleStartSelection}
              onToggleSelection={handleToggleSelection}
            />)
        ) : (
          <div className="text-center py-16">
             <div className="inline-block p-4 bg-gray-200 rounded-full">
                <LibraryIcon size={32} className="text-gray-500" />
            </div>
            <p className="text-gray-600 font-medium mt-4">Your library is empty.</p>
            <p className="text-gray-500 text-sm mt-1">Save content to find it later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;