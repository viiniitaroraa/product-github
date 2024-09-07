import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./assets/sass/main.scss";
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Header from './components/Header';
const App: React.FC = () => {
  return (
    <div className="App">
      <Header/>
    
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
       <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

    
    </div>
  );
};

export default App;
