import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login'; 
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import ChangePassword from './components/Profile/ChangePassword'; 
import UpdateProfile from './components/Profile/UpdateProfile';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payments/Subscribe'; 
import Header from './components/Layout/Header/Header';
import HomePage from './components/Home/Home';
import Courses from './components/Courses/Courses'; 
import CreateCourse from './components/Admin/CreateCourse/CreateCourse'; 
import Users from './components/Admin/Users/Users';   

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forget" element={<ForgetPassword/>} />
        <Route path="/reset" element={<ResetPassword/>} />
        <Route path="/change" element={<ChangePassword/>} /> 
        <Route path="/update" element={<UpdateProfile/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/request" element={<Request/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/sb" element={<Subscribe/>} /> 
        <Route path="/courses" element={<Courses/>} /> 
        <Route path="/admin" element={<CreateCourse/>} /> 
        <Route path="/users" element={<Users/>} />    
      </Routes>
    </Router>
  );
}

export default App;
