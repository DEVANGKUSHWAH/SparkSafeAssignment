import type { HardeningTask, Product, Bundle, UserProgress } from '../types';

export const mockTasks: HardeningTask[] = [
  {
    id: '1',
    title: 'Install Ember-Resistant Vents',
    description: 'Replace standard vents with ember-resistant mesh vents to prevent ember intrusion.',
    category: 'Structural',
    priority: 'high',
    resiliencyGain: 15,
    estimatedCost: 200,
    timeRequired: '2-4 hours',
    completed: false
  },
  {
    id: '2',
    title: 'Create Defensible Space',
    description: 'Clear vegetation and combustible materials around your home in zones.',
    category: 'Landscaping',
    priority: 'high',
    resiliencyGain: 25,
    estimatedCost: 500,
    timeRequired: '1-2 days',
    completed: true
  },
  {
    id: '3',
    title: 'Upgrade to Fire-Resistant Roofing',
    description: 'Install Class A fire-rated roofing materials to prevent ignition.',
    category: 'Structural',
    priority: 'high',
    resiliencyGain: 30,
    estimatedCost: 8000,
    timeRequired: '3-5 days',
    completed: false
  },
  {
    id: '4',
    title: 'Install Gutter Guards',
    description: 'Prevent debris accumulation in gutters that can ignite from embers.',
    category: 'Structural',
    priority: 'medium',
    resiliencyGain: 10,
    estimatedCost: 300,
    timeRequired: '4-6 hours',
    completed: false
  },
  {
    id: '5',
    title: 'Seal Gaps in Siding',
    description: 'Fill gaps and cracks where embers could penetrate the structure.',
    category: 'Structural',
    priority: 'medium',
    resiliencyGain: 12,
    estimatedCost: 150,
    timeRequired: '2-3 hours',
    completed: true
  },
  {
    id: '6',
    title: 'Install Sprinkler System',
    description: 'Set up automatic sprinkler system for roof and perimeter protection.',
    category: 'Fire Suppression',
    priority: 'low',
    resiliencyGain: 20,
    estimatedCost: 2000,
    timeRequired: '1 day',
    completed: false
  }
];

export const userProgress: UserProgress = {
  totalTasks: mockTasks.length,
  completedTasks: mockTasks.filter(task => task.completed).length,
  resiliencyScore: 75,
  estimatedInsuranceSavings: 1200,
  lastUpdated: new Date().toISOString()
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ember-Guard Mesh Vents',
    description: 'Premium stainless steel mesh vents designed to block ember intrusion while maintaining airflow.',
    price: 45.99,
    category: 'Vents & Screens',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    features: ['1/8 inch mesh', 'Corrosion resistant', 'Easy installation', 'Building code compliant'],
    relatedTasks: ['1']
  },
  {
    id: '2',
    name: 'Fire-Resistant Mulch',
    description: 'Inorganic mulch that resists ignition and helps maintain defensible space.',
    price: 29.99,
    category: 'Landscaping',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    features: ['Non-combustible', 'Moisture retention', 'Weed suppression', '2 cubic foot bag'],
    relatedTasks: ['2']
  },
  {
    id: '3',
    name: 'Class A Fire-Rated Shingles',
    description: 'Premium composite shingles with Class A fire rating for maximum protection.',
    price: 189.99,
    category: 'Roofing',
    imageUrl: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    features: ['Class A rated', '30-year warranty', 'Impact resistant', 'Energy efficient'],
    relatedTasks: ['3']
  },
  {
    id: '4',
    name: 'Professional Gutter Guards',
    description: 'Heavy-duty aluminum gutter guards that prevent debris accumulation.',
    price: 79.99,
    category: 'Gutters',
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
    rating: 4.6,
    reviewCount: 445,
    inStock: true,
    features: ['Aluminum construction', 'Leaf protection', '20-year warranty', 'Easy maintenance'],
    relatedTasks: ['4']
  },
  {
    id: '5',
    name: 'Fire-Resistant Caulk',
    description: 'High-temperature sealant for filling gaps and preventing ember penetration.',
    price: 24.99,
    category: 'Sealants',
    imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400',
    rating: 4.3,
    reviewCount: 167,
    inStock: true,
    features: ['High temperature rated', 'Flexible seal', 'Paintable', 'Easy application'],
    relatedTasks: ['5']
  },
  {
    id: '6',
    name: 'Automatic Sprinkler Kit',
    description: 'Complete sprinkler system kit for roof and perimeter fire protection.',
    price: 599.99,
    category: 'Fire Suppression',
    imageUrl: 'https://images.unsplash.com/photo-1625225233840-695456021cde?w=400',
    rating: 4.7,
    reviewCount: 78,
    inStock: false,
    features: ['Automatic activation', 'Weather resistant', 'Professional grade', 'Complete kit'],
    relatedTasks: ['6']
  },
  {
    id: '7',
    name: 'Fire-Safe Deck Stain',
    description: 'Flame-retardant wood stain for decks and outdoor structures.',
    price: 89.99,
    category: 'Coatings',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    rating: 4.4,
    reviewCount: 203,
    inStock: true,
    features: ['Flame retardant', 'UV protection', 'Long-lasting', 'Multiple colors'],
    relatedTasks: ['5']
  },
  {
    id: '8',
    name: 'Emergency Fire Extinguisher',
    description: 'Class A/B/C fire extinguisher for home and outdoor use.',
    price: 39.99,
    category: 'Fire Suppression',
    imageUrl: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
    rating: 4.8,
    reviewCount: 321,
    inStock: true,
    features: ['Multi-class rating', 'Easy operation', 'Rechargeable', 'Wall mountable'],
    relatedTasks: ['6']
  }
];

export const mockBundles: Bundle[] = [
  {
    id: 'starter-bundle',
    name: 'Wildfire Defense Starter Kit',
    description: 'Essential items to begin your home hardening journey',
    products: [mockProducts[0], mockProducts[4], mockProducts[7]],
    originalPrice: 199.97,
    bundlePrice: 159.99,
    savings: 39.98,
    category: 'Starter Kits'
  },
  {
    id: 'complete-protection',
    name: 'Complete Home Protection Bundle',
    description: 'Comprehensive wildfire protection for your entire property',
    products: [mockProducts[0], mockProducts[2], mockProducts[3], mockProducts[5], mockProducts[6]],
    originalPrice: 984.95,
    bundlePrice: 849.99,
    savings: 134.96,
    category: 'Complete Systems'
  },
  {
    id: 'landscaping-bundle',
    name: 'Defensible Space Landscaping Kit',
    description: 'Everything needed to create and maintain defensible space',
    products: [mockProducts[1], mockProducts[6]],
    originalPrice: 119.98,
    bundlePrice: 99.99,
    savings: 19.99,
    category: 'Landscaping'
  }
];
