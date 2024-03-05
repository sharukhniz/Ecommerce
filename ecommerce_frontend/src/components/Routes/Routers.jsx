import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLogin from '../adminPanel/AdminLogin';
import AdminPanel from "../adminPanel/AdminPanel"
import Category from '../adminPanel/category/Category';
import Product from '../adminPanel/category/products/Product';


const Router = () => {
  return (
    <>
    <Routes>
      <Route path='admin' element={<AdminLogin />}/>
      <Route path='adminpanel' element={<AdminPanel />}/>
      <Route path='category' element={<Category />}/>
      <Route path='product' element={<Product />}/>

    </Routes>
    </>
  )
}

export default Router