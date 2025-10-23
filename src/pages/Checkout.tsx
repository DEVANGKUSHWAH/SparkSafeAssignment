import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, Truck, CheckCircle, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Checkout() {
  const { state, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();
  const cart = state.items;
  const [currentStep, setCurrentStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = () => {
    // In a real app, this would process payment and create the order
    setOrderPlaced(true);
    setCurrentStep('confirmation');
    clearCart();
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart? This action cannot be undone.')) {
      clearCart();
    }
  };

  if (orderPlaced && currentStep === 'confirmation') {
    return <OrderConfirmation />;
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started with your wildfire protection.</p>
          <Link
            to="/marketplace"
            className="inline-flex items-center px-6 py-3 bg-fire-600 text-white rounded-md hover:bg-fire-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/marketplace')}
          className="flex items-center text-fire-600 hover:text-fire-700 mb-4 transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-8">
          {(['cart', 'shipping', 'payment', 'confirmation'] as const).map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === step ? 'bg-fire-600 text-white' :
                ['cart', 'shipping', 'payment', 'confirmation'].indexOf(currentStep) > index ? 'bg-green-500 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {['cart', 'shipping', 'payment', 'confirmation'].indexOf(currentStep) > index ? '✓' : index + 1}
              </div>
              <span className={`ml-2 text-sm capitalize ${
                currentStep === step ? 'text-fire-600 font-medium' : 'text-gray-500'
              }`}>
                {step}
              </span>
              {index < 3 && <div className="w-8 h-px bg-gray-300 ml-4" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 'cart' && (
            <CartStep
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              onClearCart={handleClearCart}
              onNext={() => setCurrentStep('shipping')}
            />
          )}

          {currentStep === 'shipping' && (
            <ShippingStep
              formData={formData}
              onChange={handleInputChange}
              onNext={() => setCurrentStep('payment')}
              onBack={() => setCurrentStep('cart')}
            />
          )}

          {currentStep === 'payment' && (
            <PaymentStep
              formData={formData}
              onChange={handleInputChange}
              onNext={handlePlaceOrder}
              onBack={() => setCurrentStep('shipping')}
            />
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary cart={cart} totalPrice={getTotalPrice()} totalItems={getTotalItems()} />
        </div>
      </div>
    </div>
  );
}

interface CartStepProps {
  cart: any[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  onClearCart: () => void;
  onNext: () => void;
}

function CartStep({ cart, updateQuantity, removeFromCart, onClearCart, onNext }: CartStepProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
        <button
          onClick={onClearCart}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.product.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-fire-100 to-fire-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-fire-600 text-xs font-medium">IMG</span>
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.product.name}</h3>
              <p className="text-sm text-gray-600">${item.product.price.toFixed(2)} each</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-right">
              <div className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-600 hover:text-red-700 text-sm mt-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <button
          onClick={onNext}
          className="w-full bg-fire-600 text-white py-3 px-4 rounded-md hover:bg-fire-700 transition-colors"
        >
          Proceed to Shipping
        </button>
      </div>
    </div>
  );
}

interface ShippingStepProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
  onBack: () => void;
}

function ShippingStep({ formData, onChange, onNext, onBack }: ShippingStepProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-fire-500 focus:border-fire-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-fire-500 focus:border-fire-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-fire-500 focus:border-fire-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-fire-500 focus:border-fire-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-fire-500 focus:border-fire-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-fire-500 focus:border-fire-500"
            required
          >
            <option value="">Select State</option>
            <option value="CA">California</option>
            <option value="OR">Oregon</option>
            <option value="WA">Washington</option>
            <option value="NV">Nevada</option>
            <option value="AZ">Arizona</option>
            <option value="CO">Colorado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-fire-500 focus:border-fire-500"
            required
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6 pt-6 border-t">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back to Cart
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-fire-600 text-white py-3 px-4 rounded-md hover:bg-fire-700 transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

interface PaymentStepProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
}

function PaymentStep({ formData, onChange, onNext, onBack }: PaymentStepProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
          <input
            type="text"
            name="nameOnCard"
            value={formData.nameOnCard}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-fire-500 focus:border-fire-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={onChange}
            placeholder="1234 5678 9012 3456"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-fire-500 focus:border-fire-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={onChange}
              placeholder="MM/YY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-fire-500 focus:border-fire-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={onChange}
              placeholder="123"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-fire-500 focus:border-fire-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-green-800">Secure Payment</h4>
            <p className="text-sm text-green-700">Your payment information is encrypted and secure.</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6 pt-6 border-t">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back to Shipping
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-fire-600 text-white py-3 px-4 rounded-md hover:bg-fire-700 transition-colors"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

interface OrderSummaryProps {
  cart: any[];
  totalPrice: number;
  totalItems: number;
}

function OrderSummary({ cart, totalPrice, totalItems }: OrderSummaryProps) {
  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span>Items ({totalItems})</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {shipping === 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <Truck className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm text-green-700 font-medium">Free shipping on orders over $100!</span>
          </div>
        </div>
      )}
      
      <div className="mt-6 space-y-2">
        {cart.slice(0, 3).map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.product.name} x{item.quantity}</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        {cart.length > 3 && (
          <div className="text-sm text-gray-500">+ {cart.length - 3} more items</div>
        )}
      </div>
    </div>
  );
}

function OrderConfirmation() {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order #{orderNumber} has been confirmed.
        </p>
        
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <CreditCard className="w-8 h-8 text-fire-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Payment Processed</h3>
              <p className="text-gray-600">Your payment has been successfully processed</p>
            </div>
            <div className="text-center">
              <Truck className="w-8 h-8 text-fire-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Preparing Shipment</h3>
              <p className="text-gray-600">We'll prepare your order for shipping within 1-2 business days</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-fire-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Protect Your Home</h3>
              <p className="text-gray-600">Follow the installation guides to maximize protection</p>
            </div>
          </div>
        </div>
        
        <div className="space-x-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-fire-600 text-white rounded-md hover:bg-fire-700 transition-colors"
          >
            Return to Dashboard
          </Link>
          <Link
            to="/marketplace"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
