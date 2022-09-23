import './App.css';
import axios from 'axios';
import Home from './pages/Home';
import Search from './pages/Search';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { Route, Routes } from "react-router-dom"

import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './pages/Profile';
import UserList from './pages/UserList';
import ProductScreen from './pages/ProductScreen';
import { useState, useEffect } from 'react';


function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {

    axios.get('/api/products/')
      .then(res => {
        console.log(res.data);
        setProducts(res.data.products);

      }).catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      <Header />

      <div className='container'>
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/search/:searchterm" element={<Search />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
