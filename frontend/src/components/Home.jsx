import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('/api/flight-info');
        setFlights(response.data.flights);
        setLoading(false);
        console.log(response.data.flights)
      } catch (error) {
        console.error('API hatası:', error);
        setLoading(false);
      }
    };
  
    fetchFlights();
  }, []);
  

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h1>Anasayfa</h1>
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            Uçuş No: {flight.flightName} - Zaman: {flight.scheduleTime}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home;
