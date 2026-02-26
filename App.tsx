
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import { AuthProvider, useAuth } from './components/AuthContext.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import LoginPage from './components/LoginPage.tsx';
import Hero from './components/Hero.tsx';
import ProductGrid from './components/ProductGrid.tsx';
import About from './components/About.tsx';
import Journal from './components/Journal.tsx';
import Assistant from './components/Assistant.tsx';
import Footer from './components/Footer.tsx';
import ProductDetail from './components/ProductDetail.tsx';
import JournalDetail from './components/JournalDetail.tsx';
import CartDrawer from './components/CartDrawer.tsx';
import Checkout from './components/Checkout.tsx';
import Admin from './components/Admin.tsx';
import { Product, JournalArticle } from './types.ts';

interface ViewState {
  type: 'home' | 'product' | 'journal' | 'checkout' | 'admin' | 'login';
  product?: Product;
  article?: JournalArticle;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const { isAuthenticated, logout } = useAuth();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (view.type !== 'home') {
      setView({ type: 'home' });
      setTimeout(() => scrollToSection(targetId), 0);
    } else {
      scrollToSection(targetId);
    }
  };

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const hideOnAdmin = view.type === 'admin';
  const hideOnCheckout = view.type === 'checkout';
  const hideOnLogin = view.type === 'login';

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2C2A26] selection:bg-[#D6D1C7] selection:text-[#2C2A26]">
      {!hideOnCheckout && !hideOnAdmin && !hideOnLogin && (
        <Navbar 
            onNavClick={handleNavClick} 
            cartCount={cartItems.length}
            onOpenCart={() => setIsCartOpen(true)}
        />
      )}
      
      <main>
        {view.type === 'home' && (
          <>
            <Hero />
            <ProductGrid onProductClick={(p) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'product', product: p });
            }} />
            <About />
            <Journal onArticleClick={(a) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'journal', article: a });
            }} />
          </>
        )}

        {view.type === 'product' && (
          <ProductDetail 
            product={view.product} 
            onBack={() => {
              setView({ type: 'home' });
              setTimeout(() => scrollToSection('products'), 50);
            }}
            onAddToCart={addToCart}
          />
        )}

        {view.type === 'journal' && (
          <JournalDetail 
            article={view.article} 
            onBack={() => setView({ type: 'home' })}
          />
        )}

        {view.type === 'checkout' && (
            <Checkout 
                items={cartItems}
                onBack={() => setView({ type: 'home' })}
            />
        )}

        {view.type === 'admin' && (
            <ProtectedRoute onBackToHome={() => setView({ type: 'home' })}>
              <Admin onBack={() => setView({ type: 'home' })} />
            </ProtectedRoute>
        )}

        {view.type === 'login' && (
            <LoginPage 
              onBack={() => setView({ type: 'home' })}
              onLoginSuccess={() => setView({ type: 'admin' })}
            />
        )}
      </main>

      {!hideOnCheckout && !hideOnAdmin && !hideOnLogin && <Footer onLinkClick={handleNavClick} onAdminClick={() => setView({ type: 'login' })} />} 

      {!hideOnAdmin && !hideOnLogin && <Assistant />}

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
            setIsCartOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setView({ type: 'checkout' });
        }}
      />
      

    </div>
  );
}

export default App;
