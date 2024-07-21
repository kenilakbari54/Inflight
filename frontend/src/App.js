import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Routes, Navigate } from 'react-router-dom';
import Home from './Component/Home';
// import About from './Component/About';
// import Signup from './Component/Signup';
// import Service from './Component/Service';
// import Login from './Component/Login';
// import Contact from './Component/Contact';
import { useContext, useState } from 'react';
import About from './Component/About';
import Shop from './Component/Shop';
import Login from './Component/Login';
import Register from './Component/Register';
import Plogin from './Component/Plogin';
import Pregister from './Component/Pregister';
import PartnersDash from './Component/PartnersDash';
import VendorDetails from './Component/VendorDetails';
import FranchiseContent from './Component/FranchiseContent';
import Vendor from './Component/Vendor';
import Cart from './Component/Cart';
import { authContext } from './Component/AuthContext';
import Profile from './Component/Profile';
import Checkout from './Component/Checkout.jsx';
import Payment from './Component/Payment.jsx';
import OrderSuccess from './Component/OrderSuccess.jsx';
import Orders from './Component/Orders.jsx';
import VendorOrder from './Component/VendorOrder.jsx';
// import { authContext } from './Component/AuthContext';
// import Deepfake from './Service/Deepfake';


function App() {


  // const [stateAuth, setStateAuth] = useState()
  const { user, role, token } = useContext(authContext);
  // const [stateAuth, setStateAuth] = useState()

  // const responce = (res) => {
  //   setStateAuth(res)
  // }
  // console.log(user)
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/franchise' element={user ? <FranchiseContent /> : <Login />} />
      <Route path='/franchise/:vendorId' element={<VendorDetails />} />
      <Route path='/payment/:id' element={<Payment />} />

      <Route path='/about' element={<About />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/orders" element={<Orders />} />


      <Route path='/cart' element={<Cart />} />

      <Route path='/profile' element={<Profile />} />

      <Route path='/vendororder' element={<VendorOrder />} />

      <Route path='/checkout' element={<Checkout />} />
      <Route path='/dash' element={<PartnersDash />} />
      {/* <Route path='/shop' element={<Shop />} /> */}
      <Route path='/Login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/Plogin' element={<Plogin />} />
      <Route path='/Pregister' element={<Pregister />} />
    </Routes>

  );
}

export default App;
