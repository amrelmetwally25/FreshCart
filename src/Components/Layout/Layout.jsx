import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
    <Navbar/>
    <div className='max-w-screen-xl mx-auto px-2 py-20'>

      <Outlet></Outlet>

    </div>
    
  
  </>
}
