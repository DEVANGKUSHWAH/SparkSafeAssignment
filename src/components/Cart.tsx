import { useState } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  AlertTriangle,
  Package,
  Shield,
  CreditCard,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export function Cart() {
  const {
    state,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleCart,
    getTotalPrice,
  } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowClearConfirm(true);
  };

  const confirmClearCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearCart();
    setShowClearConfirm(false);
  };

  const cancelClearCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowClearConfirm(false);
  };

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleCart}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-fire-50">
            <div className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-primary-600 mr-3" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Cart
                </h2>
                <p className="text-sm text-gray-600">
                  {state.items.length} {state.items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleCart}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
                  <Package className="w-12 h-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add wildfire protection products to get started</p>
                <Link
                  to="/marketplace"
                  onClick={toggleCart}
                  className="btn-primary inline-flex"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="card p-4 animate-fade-in"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-fire-50 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <Package className="w-8 h-8 text-primary-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          ${item.product.price.toFixed(2)} each
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>

                            <span className="text-sm font-medium w-8 text-center bg-gray-50 py-1 px-2 rounded">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Subtotal:</span>
                        <span className="font-medium text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 p-6">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-safe-600">Free</span>
                  </div>
                  <div className="border-t pt-2 flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-primary-600">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 bg-safe-50 p-3 rounded-lg">
                  <Shield className="h-4 w-4 text-safe-600 mr-2 flex-shrink-0" />
                  <span>All products are fire marshal approved</span>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    onClick={toggleCart}
                    className="btn-primary w-full flex items-center justify-center text-base py-3"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Secure Checkout
                  </Link>

                  <button
                    onClick={handleClearCart}
                    className="btn-ghost w-full text-center"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              cancelClearCart();
            }
          }}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 p-2 bg-red-100 rounded-full">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Clear Cart
                </h3>
                <p className="text-sm text-gray-500">Remove all items</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Are you sure you want to remove all items from your cart? This action cannot be undone and you'll need to add products again.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={confirmClearCart}
                className="btn-primary flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-500"
              >
                Yes, Clear Cart
              </button>
              <button
                type="button"
                onClick={cancelClearCart}
                className="btn-secondary flex-1"
              >
                Keep Items
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

