import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { User, LibraryItem, ActiveTab, GistItem, AccountId } from './types.ts';
import { MOCK_USER, MOCK_CONTENT } from './constants.ts';
import Header from './components/Header.tsx';
import GistFeed from './components/GistFeed.tsx';
import Library from './components/Library.tsx';
import BottomNav from './components/BottomNav.tsx';
import UpgradeModal from './components/UpgradeModal.tsx';
import AddToLibraryModal from './components/AddToLibraryModal.tsx';
import Notification from './components/Notification.tsx';
import { summarizeContent } from './services/geminiService.ts';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(MOCK_USER);
  const [content] = useState<GistItem[]>(MOCK_CONTENT);
  const [activeTab, setActiveTab] = useState<ActiveTab>('gist');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isAddToLibraryModalOpen, setIsAddToLibraryModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleAddToPriority = useCallback((authorId: AccountId) => {
    if (user.plan === 'free' && user.priorityList.length >= 5) {
      setIsUpgradeModalOpen(true);
    } else {
      setUser(prevUser => {
        if (prevUser.priorityList.includes(authorId)) {
          return {
            ...prevUser,
            priorityList: prevUser.priorityList.filter(id => id !== authorId)
          };
        }
        return {
          ...prevUser,
          priorityList: [...prevUser.priorityList, authorId]
        };
      });
    }
  }, [user.plan, user.priorityList.length]);

  const handleSaveToLibrary = useCallback(async (contentToSave: string) => {
    if (user.plan === 'free' && user.libraryItems.length >= 50) {
      setIsAddToLibraryModalOpen(false);
      setIsUpgradeModalOpen(true);
      throw new Error('User has reached their library limit.');
    }

    setIsLoading(true);
    setError(null);
    try {
      const { summary, tags } = await summarizeContent(contentToSave);
      if (summary.includes("Could not generate a summary")) {
        throw new Error("Summary generation failed");
      }
      const newItem: LibraryItem = {
        id: `lib-${Date.now()}`,
        sourceUrl: contentToSave.startsWith('http') ? contentToSave : 'pasted content',
        title: summary.split('\n')[0].replace(/#/g, '').trim() || 'New Item',
        summary,
        tags,
        savedAt: new Date().toISOString(),
        originalContent: contentToSave,
      };
      setUser(prevUser => ({
        ...prevUser,
        libraryItems: [newItem, ...prevUser.libraryItems]
      }));
      setIsAddToLibraryModalOpen(false);
    } catch (err) {
      const errorMessage = 'Failed to summarize and save content. Please try again.';
      setError(errorMessage);
      console.error(err);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [user.plan, user.libraryItems.length]);
  
  const handleDeleteLibraryItems = useCallback((itemIds: string[]) => {
    if (!itemIds || itemIds.length === 0) return;
    setUser(prevUser => ({
      ...prevUser,
      libraryItems: prevUser.libraryItems.filter(item => !itemIds.includes(item.id)),
    }));
  }, []);

  // Effect to handle incoming shares
  useEffect(() => {
    const handleSharedContent = async () => {
      const params = new URLSearchParams(window.location.search);
      const sharedUrl = params.get('url');
      const sharedText = params.get('text');
      
      const contentToSave = sharedUrl || sharedText;

      if (contentToSave) {
        setActiveTab('library');
        setNotification({ message: 'Saving shared item to library...', type: 'info' });
        
        try {
          await handleSaveToLibrary(contentToSave);
          setNotification({ message: 'Item saved to library!', type: 'success' });
        } catch (err) {
          setNotification({ message: 'Failed to save item. The content might be inaccessible.', type: 'error' });
        } finally {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    };
    
    handleSharedContent();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const openAddToLibraryModal = () => setIsAddToLibraryModalOpen(true);

  const activeTitle = useMemo(() => {
    switch (activeTab) {
      case 'gist':
        return 'Daily Gist';
      case 'library':
        return 'Library';
      default:
        return 'Gist';
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'gist':
        return <GistFeed content={content} user={user} onTogglePriority={handleAddToPriority} />;
      case 'library':
        return <Library user={user} onDeleteItems={handleDeleteLibraryItems} />;
      default:
        return <GistFeed content={content} user={user} onTogglePriority={handleAddToPriority} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center font-sans">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="w-full max-w-md bg-white flex flex-col h-screen shadow-lg">
        <Header title={activeTitle} />
        <main className="flex-grow overflow-y-auto pb-20 bg-gray-50">
          {renderContent()}
        </main>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} onOpenAddModal={openAddToLibraryModal} />
      </div>

      {isUpgradeModalOpen && <UpgradeModal onClose={() => setIsUpgradeModalOpen(false)} />}
      {isAddToLibraryModalOpen && (
        <AddToLibraryModal
          onClose={() => setIsAddToLibraryModalOpen(false)}
          onSave={handleSaveToLibrary}
          isLoading={isLoading}
          error={error}
          user={user}
        />
      )}
    </div>
  );
};

export default App;