import React from 'react';
import './styles.css';
import About from './components/about';
import Shop from './components/Shop';
import Nav from './Nav';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'semantic-ui-css/semantic.min.css';
import { Home } from './pages/home';



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: 'home', element: <Home /> },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
    ],
  },
]);

export default function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

function RootLayout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}
