import './App.css'
import Header from './component/Header'
import Footer from './component/Footer'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './login/Login'
import Registration from './login/Registration'
import Home from './login/Home'
import AddProduct from './component/AddProduct'
import ListOfProduct from './component/ListOfProduct'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path='/product' element={<ListOfProduct />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/edit-product/:id' element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );

  
}

export default App;
