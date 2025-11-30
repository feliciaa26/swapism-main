export interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  size: string;
  description: string;
  owner: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  swaps: number;
  followers: number;
  following: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface ChatPreview {
  id: string;
  user: User;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface SwapRequest {
  id: string;
  item: Product;
  requester: User;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
}