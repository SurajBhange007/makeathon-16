import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import'../Style/mainnav.css'
export default function MainNav() {
  return (
    <div style={{maxHeight: 'cal(100%)'}}>
    <div className='nav-wrapper bg-primary'>
      
    <NavLink className='nav-item brand-name' to='/' style={{fontFamily: 'Chalkduster'}}>AI LI</NavLink>
  
    <div className='nav-container'>
        <NavLink className={({isActive}) => isActive ? `active nav-item` : "nav-item"} to='/' >Home</NavLink>
        <NavLink className='nav-item' to='/blog'>Blog</NavLink>
        <NavLink className='nav-item' to='/about'>About</NavLink>
      </div>
      <NavLink className='nav-item sub-title'>Bharat Madgundi</NavLink>
    </div>
    <div >
    <Outlet />
    </div>
    <footer  style={{bottom: '0', display: 'absoulte'}}>about</footer>
    </div>)
}
