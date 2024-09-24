import { useEffect, useState } from 'react';
import axios from 'axios';

function Flights() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/api/flights');
        setReservations(response.data);
      } catch (error) {
        console.error('API hatası:', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h1>Uçuşlarım</h1>
      <ul>
        {reservations.map((reservation, index) => (
          <li key={index}>
            Uçuş ID: {reservation.flightId} - Tarih: {new Date(reservation.flightDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Flights;
