import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
    
  )
}

export default App