import React from 'react';
import {
  BrowserRouter, Routes, Route, Link
} from "react-router-dom";
import Home from './screens/Home';
import Product from './screens/Products';
import Detail from './screens/Detail';
import Cart from './screens/Cart';
import Wishlist from './screens/Wishlist';

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/detail/:id" element={<Detail />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/thanhtoan" element={<Wishlist />} />
        {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
