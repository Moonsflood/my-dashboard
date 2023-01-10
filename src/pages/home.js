import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'semantic-ui-css/semantic.min.css';
import { useEffect, useState } from 'react';
import Weather from '../components/weather';

export function Home() {
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
    <div>
      <h1>Home page</h1>
      <h1 className='text-center'>React Calendar</h1>

      <div className='testing'>
        <p className='text-center'>
          <span classname='bold'>Selected Date:</span> {date.toDateString()}
        </p>

        <div className='calendar-container'>
          <Calendar onChange={setDate} value={date} />
        </div>

        {typeof data.main != 'undefined' ? (
          <Weather weatherData={data} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
