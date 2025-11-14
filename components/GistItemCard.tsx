import React from 'react';
import { GistItem, User, AccountId } from '../types.ts';
import { Star } from 'lucide-react';

const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
}


const GistItemCard: React.FC<{ item: GistItem; user: User; onTogglePriority: (id: AccountId) => void; isBestOf?: boolean }> = ({ item, user, onTogglePriority, isBestOf = false }) => {
  const isPriority = user.priorityList.includes(item.author.id);

  const getPlatformColor = (platform: string) => {
    switch(platform) {
      case 'X': return 'bg-black text-white';
      case 'YouTube': return 'bg-red-600 text-white';
      case 'Substack': return 'bg-orange-500 text-white';
      case 'Instagram': return 'bg-pink-500 text-white';
      case 'TikTok': return 'bg-cyan-400 text-black';
      default: return 'bg-gray-500 text-white';
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200/80 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${getPlatformColor(item.author.platform)}`}>
              {item.author.platform.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-800">{item.author.username}</p>
              <p className="text-sm text-gray-500">{item.type} &middot; {formatTimeAgo(item.timestamp)}</p>
            </div>
          </div>
          <button onClick={() => onTogglePriority(item.author.id)} className="p-2 -m-2 text-gray-400 hover:text-yellow-500 transition-colors">
            <Star size={20} className={isPriority ? 'fill-yellow-400 text-yellow-500' : 'fill-none'} />
          </button>
        </div>
        <p className="mt-3 text-gray-700 leading-relaxed">
          {isBestOf && item.summary ? item.summary : item.content}
        </p>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-primary font-medium hover:underline mt-3 inline-block">
          View original
        </a>
      </div>
    </div>
  );
};

export default GistItemCard;