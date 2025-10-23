import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Star, ShoppingCart, Plus, Filter, Grid, List, Search, Package, Award, Flame } from 'lucide-react';
import { mockProducts, mockBundles } from '../data/mockData';
import { useCart } from '../context/CartContext';
import type { Product, Bundle } from '../types';

export function Marketplace() {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [products] = useState<Product[]>(mockProducts);
  const [bundles] = useState<Bundle[]>(mockBundles);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const taskId = searchParams.get('task');

  useEffect(() => {
    if (taskId) {
      setSelectedCategory('all');
    }
  }, [taskId]);

  const categories = ['all', 'Vents & Screens', 'Landscaping', 'Roofing', 'Gutters', 'Sealants', 'Fire Suppression', 'Coatings'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTask = !taskId || product.relatedTasks.includes(taskId);
    return matchesCategory && matchesSearch && matchesTask;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name':
      default: return a.name.localeCompare(b.name);
    }
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <Package className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {taskId ? 'Recommended Products' : 'Marketplace'}
                </h1>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Award className="h-4 w-4 mr-1" />
                  Fire marshal approved products
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            {taskId 
              ? 'Products specifically recommended for your selected hardening task'
              : 'Professional-grade wildfire protection products and bundles'
            }
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="card mb-8">
          <div className="flex flex-col gap-4">
            {/* Top Row - Search */}
            <div className="w-full">
              <div className="relative max-w-2xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-12 w-full text-base"
                />
              </div>
            </div>

            {/* Bottom Row - Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                {/* Category Filter */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-gray-500 hidden sm:block" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input-field w-full sm:w-48 text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field w-full sm:w-48 text-sm"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto justify-center sm:justify-start">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 sm:p-2 rounded transition-colors flex-1 sm:flex-none ${viewMode === 'grid' ? 'bg-white shadow text-primary-600' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  <Grid className="w-4 h-4 mx-auto sm:mx-0" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 sm:p-2 rounded transition-colors flex-1 sm:flex-none ${viewMode === 'list' ? 'bg-white shadow text-primary-600' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  <List className="w-4 h-4 mx-auto sm:mx-0" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bundles Section */}
        {!taskId && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Protection Bundles</h2>
                <p className="text-gray-600 mt-1">Save money with curated product combinations</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundles.map(bundle => (
                <BundleCard key={bundle.id} bundle={bundle} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {taskId ? 'Recommended Products' : 'All Products'} ({sortedProducts.length})
              </h2>
              <p className="text-gray-600 mt-1">
                {taskId ? 'Specifically selected for your hardening task' : 'Fire marshal approved wildfire protection products'}
              </p>
            </div>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map(product => (
                <ProductListItem key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Flame className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="card animate-fade-in group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg mb-4 bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden w-full h-48 flex items-center justify-center bg-gradient-to-br from-primary-50 to-fire-50">
          <div className="text-center">
            <Package className="h-12 w-12 text-primary-400 mx-auto mb-2" />
            <span className="text-primary-600 text-sm font-medium">{product.category}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-ember-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
          <span className={`badge text-xs ${
            product.inStock ? 'badge-low' : 'badge-high'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="btn-primary w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

interface ProductListItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductListItem({ product, onAddToCart }: ProductListItemProps) {
  return (
    <div className="card flex flex-col sm:flex-row items-start gap-6 animate-fade-in">
      <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden w-full h-full bg-gradient-to-br from-primary-50 to-fire-50 flex items-center justify-center">
          <div className="text-center">
            <Package className="h-6 w-6 text-primary-400 mx-auto mb-1" />
            <span className="text-primary-600 text-xs font-medium">{product.category}</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-3 leading-relaxed">{product.description}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-ember-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-1 text-gray-500">({product.reviewCount})</span>
          </div>
          <span className={`badge ${product.inStock ? 'badge-low' : 'badge-high'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-4 w-full sm:w-auto">
        <div className="text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</div>
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

interface BundleCardProps {
  bundle: Bundle;
  onAddToCart: (product: Product) => void;
}

function BundleCard({ bundle, onAddToCart }: BundleCardProps) {
  const handleAddBundle = () => {
    bundle.products.forEach(product => {
      onAddToCart(product);
    });
  };

  return (
    <div className="card animate-fade-in group relative overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <div className="badge bg-ember-100 text-ember-800 font-semibold">
          Bundle Deal
        </div>
      </div>
      
      <div className="mb-6 pr-20">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {bundle.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{bundle.description}</p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Package className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500 font-medium">
            {bundle.products.length} products included
          </span>
        </div>
        <ul className="text-sm text-gray-600 space-y-2">
          {bundle.products.slice(0, 3).map(product => (
            <li key={product.id} className="flex items-center">
              <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 flex-shrink-0"></div>
              {product.name}
            </li>
          ))}
          {bundle.products.length > 3 && (
            <li className="text-gray-400 font-medium ml-5">
              + {bundle.products.length - 3} more items
            </li>
          )}
        </ul>
      </div>
      
      <div className="border-t pt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Regular price:</span>
            <span className="text-sm text-gray-500 line-through">${bundle.originalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Bundle price:</span>
            <span className="text-xl font-bold text-primary-600">${bundle.bundlePrice.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="bg-safe-50 rounded-lg p-3">
          <div className="text-safe-700 font-semibold text-center">
            💰 Save ${bundle.savings.toFixed(2)}
          </div>
        </div>
        
        <button
          onClick={handleAddBundle}
          className="btn-primary w-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add Complete Bundle
        </button>
      </div>
    </div>
  );
}
