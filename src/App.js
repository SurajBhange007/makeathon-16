import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import MainNav from './components/MainNav';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ErrorPage from './components/ErrorPage';
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
    element: <div ><ErrorPage/></div>
   }
  ],
  element: <MainNav />
}]);

  return (
    // <div stye={{height: '100vh'}}>
    <RouterProvider router={router} />
    // </div>
  );
}

export default App;



// body{
//   height: 80%;
//   margin: 10px;
//   padding: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: transparent;
// }
