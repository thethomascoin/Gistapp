import { User, GistItem, ConnectedAccount } from './types.ts';

const ACCOUNTS: ConnectedAccount[] = [
  { id: 'friend1', platform: 'X', username: 'CloseFriend' },
  { id: 'creator1', platform: 'YouTube', username: 'TechTube' },
  { id: 'news1', platform: 'Substack', username: 'DailyDispatch' },
  { id: 'friend2', platform: 'Instagram', username: 'TravelPal' },
  { id: 'creator2', platform: 'TikTok', username: 'QuickLaughs' },
  { id: 'creator3', platform: 'X', username: 'DeepThinker' },
  { id: 'news2', platform: 'Substack', username: 'MarketWeekly' },
  { id: 'creator4', platform: 'YouTube', username: 'DesignGuru' },
];

export const MOCK_USER: User = {
  id: 'user123',
  name: 'Alex',
  plan: 'free',
  connectedAccounts: ACCOUNTS,
  priorityList: ['friend1', 'creator1', 'news1'],
  libraryItems: [
    {
      id: 'lib-1',
      sourceUrl: 'https://example.com/article1',
      title: 'The Future of AI in Design',
      summary: 'This article explores how artificial intelligence is reshaping the design industry, from automated UI generation to personalized user experiences. It covers emerging tools and ethical considerations for designers.',
      tags: ['AI', 'Design', 'Technology'],
      savedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
        id: 'lib-2',
        sourceUrl: 'https://youtube.com/watch?v=xyz',
        title: '10-Minute Morning Yoga',
        summary: 'A guided 10-minute yoga session perfect for starting your day. Focuses on gentle stretches and mindfulness to energize the body and calm the mind.',
        tags: ['Yoga', 'Wellness', 'Fitness'],
        savedAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ],
};

export const MOCK_CONTENT: GistItem[] = [
  {
    id: 'gist-1',
    author: ACCOUNTS[0], // friend1
    type: 'tweet',
    content: "Just had the best coffee of my life at 'The Daily Grind'. Highly recommend!",
    url: 'https://x.com/CloseFriend/status/1',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'gist-2',
    author: ACCOUNTS[1], // creator1
    type: 'video',
    content: "My new video is live! We're unboxing the latest smartphone and putting its camera to the test. You won't believe the results.",
    url: 'https://youtube.com/watch?v=abc',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'gist-3',
    author: ACCOUNTS[2], // news1
    type: 'article',
    content: "This week's newsletter covers the surprising boom in the vintage electronics market. Why are cassette players making a comeback?",
    url: 'https://dailydispatch.substack.com/p/1',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'gist-4',
    author: ACCOUNTS[3], // friend2
    type: 'tweet',
    content: "Photos from my trip to the mountains are now up on my profile! The views were breathtaking.",
    url: 'https://instagram.com/p/1',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    summary: "TravelPal posted new mountain photos, mentioning breathtaking views."
  },
   {
    id: 'gist-5',
    author: ACCOUNTS[5], // creator3
    type: 'tweet',
    content: "A thread on mental models for better decision making. 1/10: First, let's talk about 'First Principles Thinking'...",
    url: 'https://x.com/DeepThinker/status/1',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'gist-6',
    author: ACCOUNTS[6], // news2
    type: 'article',
    content: 'Market Analysis: Are we heading for a correction or a new bull run? We break down the key indicators for the next quarter.',
    url: 'https://marketweekly.substack.com/p/1',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    summary: "MarketWeekly's latest analysis discusses key economic indicators, questioning if a market correction or a new bull run is imminent."
  },
];
