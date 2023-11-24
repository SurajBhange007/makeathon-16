import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import'../Style/mainnav.css'
export default function MainNav() {
  return (
    <>
    <div className='nav-wrapper bg-primary'>
      
    <NavLink className='nav-item brand-name' to='/'>Brand Name</NavLink>
  
    <div className='nav-container'>

        <NavLink className='nav-item' to='/'>Home</NavLink>
        <NavLink className='nav-item' to='/blog'>Blog</NavLink>
        <NavLink className='nav-item' to='/about'>About</NavLink>
      </div>
      <NavLink className='nav-item sub-title'>User Name</NavLink>
    </div>
    <Outlet />
    {/* <footer style={{bottom: '0', display: 'absoulte'}}>about</footer> */}
    </>)
}
