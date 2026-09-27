export type Province = 
  | 'All'
  | 'Iloilo'
  | 'Negros Occidental'
  | 'Guimaras'
  | 'Capiz'
  | 'Aklan'
  | 'Antique';

export interface FoodSubmitter {
  id: string;
  name: string;
  role: string;
  avatar: string; // 1x1 formal circular portrait
  studentNumber?: string;
  quote?: string;
}

export interface FoodItem {
  id: string;
  title: string;
  nativeTitle: string;
  province: 'Iloilo' | 'Negros Occidental' | 'Guimaras' | 'Capiz' | 'Aklan' | 'Antique';
  originPlace: string;
  description: string;
  culturalBackground: string;
  photo: string;
  submitter: FoodSubmitter;
  flavorProfile: string[];
  keyIngredients: string[];
  bestPairing: string;
  rating: number;
  reviewCount: number;
  funFact: string;
}

export interface DinerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  recommendedDish: string;
}

export interface LocalDiner {
  id: string;
  name: string;
  province: 'Iloilo' | 'Negros Occidental' | 'Guimaras' | 'Capiz' | 'Aklan' | 'Antique';
  city: string;
  specialty: string;
  photo: string;
  address: string;
  priceLevel: '₱' | '₱₱' | '₱₱₱';
  rating: number;
  reviews: DinerReview[];
  tag: string;
  mapCoords: { x: number; y: number }; // Percentage coords on custom Region VI map
}

export interface TravelSpot {
  id: string;
  name: string;
  province: 'Iloilo' | 'Negros Occidental' | 'Guimaras' | 'Capiz' | 'Aklan' | 'Antique';
  location: string;
  description: string;
  culinaryConnection: string;
  photo: string;
  funFact: string;
  travelTip: string;
}

export interface ReferenceItem {
  id: string;
  title: string;
  authorOrSource: string;
  year?: string;
  category: 'Official Tourism Portal' | 'Culinary Lore & History' | 'Photo Credit & Imagery' | 'Heritage Documentation';
  description: string;
  linkText: string;
  url?: string;
}

export interface SiteConfig {
  welcomeGreeting: string;
  siteTitle: string;
  siteSubtitle: string;
  youtubeVideoUrl: string;
  videoCaption: string;
  galleryIntroStory: string;
  manifestoTitle: string;
  manifestoText: string;
}
