import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/mainlayout'
import Home from './pages/home';
import Services from './pages/service';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/login';
import Signup from './pages/signup';
import RidersList from './pages/ridersList';
import AdminLayout from './layout/adminLayout';
import TripUpdations from './pages/tripUpdations';
import DisplayPayment from './pages/displayPayment';
import RiderUpdation from './pages/riderUpdation';
import AddPayment from './pages/addPayment';
import Dashboard from './pages/dashboard';
import RiderDetails from './pages/rider';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/ridersList' element={<RidersList />} />
          <Route path='/tripUpdations' element={<TripUpdations />} />
          <Route path='/displayPayment' element={<DisplayPayment />} />
          <Route path='/riderUpdation' element={<RiderUpdation />} />
          <Route path='/addPayment' element={<AddPayment />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path='/adminDashBoard' element={<Dashboard />} />
          <Route path='/riders' element={<RiderDetails />} />
        </Route>

      </Routes>
    </Router >
  )

}

export default App