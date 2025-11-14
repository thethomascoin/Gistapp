import React, { useState } from 'react';
import { User } from '../types';
import { X, Sparkles, Clipboard } from 'lucide-react';

interface AddToLibraryModalProps {
  onClose: () => void;
  onSave: (content: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  user: User;
}

const AddToLibraryModal: React.FC<AddToLibraryModalProps> = ({ onClose, onSave, isLoading, error, user }) => {
  const [content, setContent] = useState('');
  
  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setContent(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };
  
  const freeTierLimitReached = user.plan === 'free' && user.libraryItems.length >= 50;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-sm p-6 animate-slide-in-up">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-medium text-gray-900">Save to Library</h2>
          <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 rounded-full p-2 -mr-2">
            <X size={20} />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">Paste a URL or any text content to summarize and save it.</p>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="https://example.com/article..."
          className="w-full h-32 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:outline-none resize-none"
          disabled={isLoading || freeTierLimitReached}
        />
        
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {freeTierLimitReached && <p className="text-amber-600 text-sm mt-2">You've reached your save limit for the free plan.</p>}

        <div className="mt-4 flex flex-col sm:flex-row-reverse gap-2">
           <button
            onClick={handleSave}
            disabled={isLoading || !content.trim() || freeTierLimitReached}
            className="w-full bg-brand-primary text-white font-medium py-2.5 px-4 rounded-full hover:opacity-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Sparkles size={18} className="animate-pulse mr-2" />
                Gisting...
              </>
            ) : (
              'Save to Library'
            )}
          </button>
          <button
            onClick={handlePasteFromClipboard}
            className="w-full text-sm text-brand-primary font-medium py-2.5 px-4 rounded-full mt-2 sm:mt-0 hover:bg-brand-primary/10 transition-colors flex items-center justify-center border border-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || freeTierLimitReached}
          >
            <Clipboard size={16} className="mr-2" />
            Paste from Clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToLibraryModal;