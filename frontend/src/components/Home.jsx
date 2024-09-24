import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scheduleDate, setScheduleDate] = useState('');  // Uçuş tarihi
  const [route, setRoute] = useState('');  // Kalkış/Varış noktası (IATA kodu)
  const [flightDirection, setFlightDirection] = useState('');  // Uçuş yönü (A = arrival, D = departure)

  // Uçuş bilgilerini çekme
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('/api/flight-info');
        setFlights(response.data.flights || []);
        setLoading(false);
      } catch (error) {
        console.error('API hatası:', error);
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  // Filtreleme işlemi
  const handleFilter = async () => {
    try {
      // Boş olmayan parametreleri toplamak için bir query objesi oluştur
      const params = {};
      if (scheduleDate) params.scheduleDate = scheduleDate;
      if (route) params.route = route;
      if (flightDirection) params.flightDirection = flightDirection;

      // Axios isteğini sadece dolu parametrelerle yap
      const response = await axios.get(`/api/flight-info`, { params });

      setFlights(response.data.flights || []);
      console.log(response.data.flights);
    } catch (error) {
      console.error('API hatası:', error);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h1>Anasayfa</h1>

      {/* Filtreleme formu */}
      <div>
        <label>Uçuş Tarihi: </label>
        <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />

        <label>Kalkış/Varış Noktası (IATA Kodu): </label>
        <input type="text" value={route} onChange={(e) => setRoute(e.target.value)} />

        <label>Yön: </label>
        <select value={flightDirection} onChange={(e) => setFlightDirection(e.target.value)}>
          <option value="">Tümü</option>
          <option value="A">Gelen</option>
          <option value="D">Giden</option>
        </select>

        <button onClick={handleFilter}>Filtrele</button>
      </div>

      {/* Uçuş Listesi */}
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            Uçuş No: {flight.flightName} - Zaman: {flight.scheduleTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
