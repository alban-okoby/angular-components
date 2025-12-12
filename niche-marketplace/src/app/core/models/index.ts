// Modèles principaux
export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatar?: string;
  phone?: string;
  location: string;
  rating: number;
  memberSince: Date;
  isAdmin: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subcategories?: Subcategory[];
  adCount: number;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  subcategoryId?: string;
  userId: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  images: string[];
  isBoosted: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  condition: 'new' | 'like_new' | 'good' | 'fair';
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  imageUrl?: string;
  read: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  adId: string;
  buyerId: string;
  sellerId: string;
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: number;
}

export interface FilterOptions {
  category?: string;
  subcategory?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string[];
  sortBy: 'recent' | 'price_asc' | 'price_desc' | 'relevant';
  searchQuery?: string;
}

// État de l'application
export interface AppState {
  user: User | null;
  ads: Ad[];
  categories: Category[];
  conversations: Conversation[];
  selectedAd: Ad | null;
  filters: FilterOptions;
  loading: boolean;
  error: string | null;
}