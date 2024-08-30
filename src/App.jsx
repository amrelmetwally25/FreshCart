import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'flowbite';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import WhishList from './Components/WishList/WhishList'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Prands from './Components/Prands/Prands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Notfound from './Components/Notfound/Notfound'
import { UserContextProvider } from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetalis from './Components/ProductDetails/ProductDetalis'
import CartContextProvider from './Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import WhishListContextProvider from './Context/WhishListContext';
import ChickOut from './Components/CheckOut/ChickOut'
import Orders from './Components/Orders/Orders'
import VerifyResetCode from './Components/VerifyResetCode/VerifyResetCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'

function App() {
  let router = createBrowserRouter([
    {path:'',element:<Layout/> , children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'whishlist',element:<ProtectedRoute><WhishList/></ProtectedRoute>},
      {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'prands',element:<ProtectedRoute><Prands/></ProtectedRoute>},
      {path:'chickout',element:<ProtectedRoute><ChickOut/></ProtectedRoute>},
      {path:'allorders',element:<ProtectedRoute><Orders/></ProtectedRoute>},
      {path:'productdetails/:id',element:<ProtectedRoute><ProductDetalis/></ProtectedRoute>},
      {path:'*',element:<ProtectedRoute><Notfound/></ProtectedRoute>},
      {path:'login',element:<Login/>},
      {path:'register',element:<Register/>},
      {path:'forgetpassword',element:<ForgetPassword/>},
      {path:'verifyresetcode',element:<VerifyResetCode/>},
      {path:'resetpassword',element:<ResetPassword/>}

    ]}
  ])
  return <>
    <UserContextProvider>
      <CartContextProvider>
          <WhishListContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </WhishListContextProvider>
        </CartContextProvider>
    </UserContextProvider>
  

  
  </>
    
}
export default App
