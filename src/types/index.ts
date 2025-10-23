export interface HardeningTask {
  id: string;
  title: string;
  description: string;
  category: 'Structural' | 'Landscaping' | 'Fire Suppression' | 'Roofing' | 'Gutters' | 'Sealants' | 'Coatings';
  priority: 'high' | 'medium' | 'low';
  resiliencyGain: number;
  estimatedCost: number;
  timeRequired: string;
  completed: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  features: string[];
  relatedTasks: string[];
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  products: Product[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  category: string;
}

export interface UserProgress {
  totalTasks: number;
  completedTasks: number;
  resiliencyScore: number;
  estimatedInsuranceSavings: number;
  lastUpdated: string;
}
