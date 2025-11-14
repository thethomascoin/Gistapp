import React from 'react';
import { GistItem, User, AccountId } from '../types.ts';
import GistItemCard from './GistItemCard.tsx';
import { Sparkles } from 'lucide-react';

interface GistFeedProps {
  content: GistItem[];
  user: User;
  onTogglePriority: (authorId: AccountId) => void;
}

const GistFeed: React.FC<GistFeedProps> = ({ content, user, onTogglePriority }) => {
  const priorityContent = content.filter(item => user.priorityList.includes(item.author.id));
  const bestOfContent = content.filter(item => !user.priorityList.includes(item.author.id));

  return (
    <div className="p-4 space-y-6">
      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">Priority</h2>
        {priorityContent.length > 0 ? (
          <div className="space-y-3">
            {priorityContent.map(item => (
              <GistItemCard key={item.id} item={item} user={user} onTogglePriority={onTogglePriority} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm px-1 py-4 text-center bg-gray-100 rounded-lg">Add people to your Priority list to see their updates here.</p>
        )}
      </section>

      <section>
         <h2 className="flex items-center text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">
          <Sparkles className="text-brand-secondary mr-2" size={16} />
          Best Of The Rest
        </h2>
        {bestOfContent.length > 0 ? (
          <div className="space-y-3">
            {bestOfContent.map(item => (
                <GistItemCard key={item.id} item={item} user={user} onTogglePriority={onTogglePriority} isBestOf={true} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm px-1 py-4 text-center bg-gray-100 rounded-lg">No other updates right now.</p>
        )}
      </section>
    </div>
  );
};

export default GistFeed;