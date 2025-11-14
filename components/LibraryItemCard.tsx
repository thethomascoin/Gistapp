import React, { useRef } from 'react';
import { LibraryItem } from '../types.ts';
import { CheckCircle2, Circle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface LibraryItemCardProps {
  item: LibraryItem;
  isSelectionMode: boolean;
  isSelected: boolean;
  onStartSelection: (id: string) => void;
  onToggleSelection: (id: string) => void;
}

const LibraryItemCard: React.FC<LibraryItemCardProps> = ({ item, isSelectionMode, isSelected, onStartSelection, onToggleSelection }) => {
  const longPressTimeout = useRef<number | null>(null);

  const handlePressStart = () => {
    if (isSelectionMode) return;
    longPressTimeout.current = window.setTimeout(() => {
      onStartSelection(item.id);
      longPressTimeout.current = null;
    }, 500);
  };

  const handlePressEnd = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  const handleClick = () => {
    // Prevent click if a long-press was just completed.
    if (!longPressTimeout.current && isSelectionMode) {
      onToggleSelection(item.id);
    }
  };
  
  const selectionClasses = isSelected 
    ? 'bg-brand-primary/10 border-brand-primary' 
    : 'bg-white border-gray-200/80';

  return (
    <div
      onClick={handleClick}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      className={`rounded-lg border overflow-hidden transition-colors duration-200 flex items-start cursor-pointer ${selectionClasses}`}
    >
      {isSelectionMode && (
        <div className="p-4 self-center">
          {isSelected ? (
            <CheckCircle2 size={22} className="text-brand-primary" />
          ) : (
            <Circle size={22} className="text-gray-400" />
          )}
        </div>
      )}
      <div className={`p-4 ${isSelectionMode ? 'pl-0' : ''} flex-1`}>
        <h3 className="font-medium text-gray-800 text-base">{item.title}</h3>
        <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-brand-primary truncate block" onClick={(e) => isSelectionMode && e.preventDefault()}>
          {item.sourceUrl}
        </a>
        <div className="mt-2 prose prose-sm max-w-none text-gray-600 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {item.summary}
            </ReactMarkdown>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryItemCard;