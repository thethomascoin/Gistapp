
export type Plan = 'free' | 'pro';
export type ActiveTab = 'gist' | 'library';
export type AccountId = string;
export type ContentType = 'tweet' | 'article' | 'video';

export interface ConnectedAccount {
  id: AccountId;
  platform: 'X' | 'Instagram' | 'TikTok' | 'YouTube' | 'Substack';
  username: string;
}

export interface User {
  id: string;
  name: string;
  plan: Plan;
  connectedAccounts: ConnectedAccount[];
  priorityList: AccountId[];
  libraryItems: LibraryItem[];
}

export interface LibraryItem {
  id: string;
  sourceUrl: string;
  title: string;
  summary: string;
  tags: string[];
  savedAt: string;
  originalContent?: string;
}

export interface GistItem {
  id: string;
  author: ConnectedAccount;
  type: ContentType;
  content: string;
  url: string;
  timestamp: string;
  summary?: string; // AI-generated summary for "Best Of" items
}
