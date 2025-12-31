import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register';
import Home from './pages/Home';
import Add_book from './pages/Add_book';
import Update_book from './pages/Update_book';
function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Login/>}/>
      <Route path='/update_book/:id' element={<Update_book/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/add_book' element={<Add_book/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
