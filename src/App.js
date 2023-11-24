import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import MainNav from './components/MainNav';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
function App() {

  const router = createBrowserRouter([{
  path: '',
  children: [
  {
    path: '/',
    element: <Home />
  }, {
   path: '/login',
   element: <LoginPage /> 
  }, {
    path: '/sign-up',
    element: <SignUpPage /> 
   },
   {
    path:'*',
    element: <div>Error Page</div>
   }
  ],
  element: <MainNav />
}]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
