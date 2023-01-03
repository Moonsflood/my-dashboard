import React from 'react';
import './styles.css';
import About from './About';
import Shop from './Shop';
import Nav from './Nav';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import 'semantic-ui-css/semantic.min.css';
import Weather from './components/weather';

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
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log(result);
        });
    };
    fetchData();
  }, [lat, long]);

  const [date, setDate] = useState(new Date());

  return (
    <div className='App'>
      <RouterProvider router={router} />
      <h1 className='text-center'>React Calendar</h1>

      <div className='testing'>
        <div className='calendar-container'>
          <Calendar onChange={setDate} value={date} />
        </div>
        <p className='text-center'>
          <span classname='bold'>Selected Date:</span> {date.toDateString()}
        </p>

        {typeof data.main != 'undefined' ? (
          <Weather weatherData={data} />
        ) : (
          <div></div>
        )}
      </div>
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

function Home() {
  return <h1>Home page</h1>;
}
