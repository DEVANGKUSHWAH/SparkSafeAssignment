import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { TaskProvider } from './context/TaskContext';
import { Navigation } from './components/Navigation';
import { Cart } from './components';
import { Dashboard } from './pages/Dashboard';
import { Marketplace } from './pages/Marketplace';
import { TaskDetail } from './pages/TaskDetail';
import { Checkout } from './pages/Checkout';

function App() {
  return (
    <TaskProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/task/:id" element={<TaskDetail />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            <Cart />
          </div>
        </Router>
      </CartProvider>
    </TaskProvider>
  );
}

export default App;
