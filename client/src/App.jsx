import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Connect from './pages/Connect';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Connect/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
    
  )
}

export default App