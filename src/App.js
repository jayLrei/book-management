import './App.css';
import { useState } from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Header from './Pages/Header.js';
import Product from './Pages/ProductPage.js'
import Book from './Pages/BookPage.js'
import ProductDetailPage from './Pages/ProductDetailPage'
import OrderPage from './Pages/OrderPage';
import Settlement from './Pages/SettlementPage';
import BookOrder from './Pages/BookOrder';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path='/' element = {<div>home</div> }></Route>

            <Route path='/book' element = {
             <Book/> 
            }></Route>

            <Route path="/product" element={<Product />} />

            <Route path="/product/:distributorId" element={<ProductDetailPage />} />

            <Route path="/product/:distributorId/:transactionId" element={<OrderPage />} />

            <Route path='settlement' element={<Settlement />} />

            <Route path='statistics' element = {
              <div>통계관리</div>
            }></Route>

            <Route path='information' element = {
              <div>정보관리</div>
            }></Route>

            <Route path='bookorder' element = {<BookOrder/>}></Route>

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
