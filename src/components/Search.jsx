import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link } from 'react-router-dom';

export default function Search() {
    const [stations, setStations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('all'); // Options: 'all', 'id', 'address', 'gas_type', 'is_open'

    useEffect(() => {
        const fetchStationsData = async () => {
            const stationCollectionRef = collection(db, 'updateDoc');
            const stationSnapshot = await getDocs(stationCollectionRef);
            const stationList = stationSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setStations(stationList);
        };

        fetchStationsData();
    }, []);

    const filteredStations = stations.filter(station => {
        const searchValue = searchQuery.toLowerCase();
        switch (searchType) {
            case 'id':
                return station.id.toLowerCase().includes(searchValue);
            case 'address':
                return station.address.toLowerCase().includes(searchValue);
            case 'gas_type':
                return station.gas_type.toLowerCase().includes(searchValue);
            case 'is_open':
                return station.is_open ? searchValue === 'ochiq' : searchValue === 'yopiq';
            default:
                return true; // If 'all' is selected, return all stations
        }
    });

    return (
        <div className="max-w-4xl mx-auto p-6 mt-20">
            <div className="mb-6 flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="border rounded-lg p-2"
                >
                    <option value="all">Hammasi</option>
                    <option value="id">Stansiya Raqami</option>
                    <option value="address">Manzil</option>
                    <option value="gas_type">Gas Turi</option>
                    <option value="is_open">Ochiq/Yopiq</option>
                </select>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                {filteredStations.length > 0 ? (
                    filteredStations.map(station => (
                        <div key={station.id} className="border-b last:border-b-0 pb-4 mb-4">
                                <Link to={'/station/'+String(station.id)}>
                                <h2 className="text-2xl font-bold mb-2 text-gray-800">Stansiya Raqami: {station.id}</h2>
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Manzil:</span> {station.address}</p>
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Turi:</span> {station.gas_type}</p>
                                <p className={`text-gray-700 mb-2 font-semibold ${station.is_open ? 'text-green-600' : 'text-red-600'}`}>
                                    {station.is_open ? 'Ochiq' : 'Yopiq'}
                                </p>
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Telefon Raqami:</span> {station.phone_number}</p>
                                <img src={station.station_image} alt="Station camera" className="w-full h-48 object-cover rounded-lg shadow-md mb-4" />
                        </Link>
                            </div>
                    ))
                ) : (
                    <p className="text-gray-500">No stations found.</p>
                )}
            </div>
        </div>
    );
}
