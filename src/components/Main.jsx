import React, { useEffect, useState } from 'react';
import StartGif from './../assets/output-onlinegiftools.gif'
import { Link } from 'react-router-dom'

import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';  // Import the Firestore instance


export default function Main() {
    const [stations, setStations] = useState([]);
  const todayIndex = new Date().getDay(); // Get today's index (0 = Sunday, 6 = Saturday)

  useEffect(() => {
    const fetchStations = async () => {
      const stationsCollection = collection(db, 'updateDoc');
      const stationsSnapshot = await getDocs(stationsCollection);

      // Only extract the needed fields and check if the station is open today
      const stationsList = stationsSnapshot.docs.map(doc => {
        const data = doc.data();

        // Check if the station is open today based on the work_time array
        const todayWorkTime = data.work_time[todayIndex];
        const isOpenToday = checkIfOpenToday(todayWorkTime, data.is_open);

        return {
          id: doc.id,  // Station ID (document ID)
          station_image: data.station_image,
          address: data.address,
          gas_type: data.gas_type,
          phone_number: data.phone_number,
          is_open: isOpenToday,  // Check if open today
        };
      });

      setStations(stationsList);
    };

    fetchStations();
  }, []);

  // Helper function to check if the station is open today
  const checkIfOpenToday = (todayWorkTime, is_open) => {
    if (!is_open || todayWorkTime === "0") {
      return false;  // Closed
    } else if (todayWorkTime === "24") {
      return true;  // Open 24 hours
    } else {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();

      // Extract start and end time from today's work time (like "09001730")
      const startHour = parseInt(todayWorkTime.slice(0, 2), 10);
      const startMinutes = parseInt(todayWorkTime.slice(2, 4), 10);
      const endHour = parseInt(todayWorkTime.slice(4, 6), 10);
      const endMinutes = parseInt(todayWorkTime.slice(6, 8), 10);

      // Check if the current time is within the open hours
      const currentTimeInMinutes = currentHour * 60 + currentMinutes;
      const startTimeInMinutes = startHour * 60 + startMinutes;
      const endTimeInMinutes = endHour * 60 + endMinutes;

      return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
    }
  };

  if (stations[0]==undefined) {
    return <div className='h-9 w-9 bg-orange-500 rounded-full animate-ping fixed top-[45%] left-[45%]'></div>
     }   

  return (
    <div>



{/* main section */}
    <div className='mt-32 mb-16 max-w-[600px] mx-auto'>

    <div>
      {stations.map(station => (
       < Link to={'/station/'+String(station.id)}>
        <div className='space-y-3 pb-2 pt-2' key={station.id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
          <h2>Stansiya Raqami: {station.id}</h2>
          <img src={station.station_image} alt="Station"  style={{ maxWidth: '100%' }} />
          <p>Manzil: {station.address}</p>
          
          <p>Turi: {station.gas_type}</p>
          <p>Telefon raqami: +998 {station.phone_number}</p>
          <p>Bugun: {station.is_open ? <div className='inline bg-green-500 p-2 text-white rounded-xl'>Ochiq</div> : <div className='inline bg-rose-500 p-2 text-white rounded-xl'>Yopiq</div>}</p>
        </div>
        </Link>
      ))}
    </div>


    </div>
{/* main section */}





    </div>
  )
}
