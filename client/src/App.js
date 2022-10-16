import './App.css';

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
import Shipping from './pages/Shipping';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import Payment from './pages/Payment'
import UserEdit from './pages/UserEdit'
import ProductList from './pages/ProductList'
import ProductEdit from './pages/ProductEdit';
import OrderList from './pages/OrderList'


function App() {

  return (
    <div className="App">
      <Header />

      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/admin/user/:id/edit' element={<UserEdit />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
          <Route path="/admin/productlist" element={<ProductList />} />
          <Route path="/admin/orderlist" element={<OrderList />} />
          <Route path="/search/:searchterm" element={<Search />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
