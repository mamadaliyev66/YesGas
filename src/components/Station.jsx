import React, { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useParams } from 'react-router-dom';
import CarIcon from '../assets/icons8-car-50.png'
import BusIcon from './../assets/icons8-bus-50.png'
import TruckIcon from '../assets/icons8-truck-50.png'
export default function Station() {
    const { id } = useParams();
    const [station, setStation] = useState(null);
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const fetchStationData = async () => {
            const stationDocRef = doc(db, 'updateDoc', id);
            const stationSnapshot = await getDoc(stationDocRef);

            if (stationSnapshot.exists()) {
                setStation(stationSnapshot.data());

                const priceCollectionRef = collection(stationDocRef, 'price');
                const priceSnapshot = await getDocs(priceCollectionRef);

                const priceList = priceSnapshot.docs.map(doc => ({
                    gasTypeName: doc.id,
                    ...doc.data(),
                }));
                setPrices(priceList);
            }
        };

        fetchStationData();
    }, [id]);

    const daysOfWeek = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"];

    const formatWorkTime = (time) => {
        if (time === "24") {
            return "24 Soat Ochiq";
        } else if (time === "0") {
            return "Yopiq";
        } else {
            const startHour = `${time.slice(0, 2)}:${time.slice(2, 4)}`;
            const endHour = `${time.slice(4, 6)}:${time.slice(6)}`;
            return `${startHour} - ${endHour}`;
        }
    };
    if (station==undefined) {
        return <div className='h-9 w-9 bg-orange-500 rounded-full animate-ping fixed top-[45%] left-[45%]'></div>
         }   

    return (
        <div className="max-w-4xl mx-auto mt-20 mb-16">
            <div className="bg-white shadow-md rounded-lg p-6">
            <img src={station.station_image} alt="Station camera" className="w-full h-48 object-cover rounded-lg shadow-md font-bold" />
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Stansiya Raqami: {id}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-gray-700 mb-2"><span className="font-semibold">Joylashuv:</span> {station.viloyat}</p>
                        <p className="text-gray-700 mb-2"><span className="font-semibold">Manzil:</span> {station.address}</p>

                        <p className="text-gray-700 mb-2"><span className="font-semibold">Turi:</span> {station.gas_type}</p>
                        <p className={`text-gray-700 mb-2 font-semibold ${station.is_open ? 'text-green-600' : 'text-red-600'}`}>
                            {station.is_open ? 'Ochiq' : 'Yopiq'}
                        </p>
                        <p className="text-gray-700 mb-2"><span className="font-semibold">Telefon raqam:</span> {station.phone_number}</p>
                    </div>
                </div>
                    <div>
                        <img src={station.cam_img} alt="Station camera" className="w-full  object-cover rounded-lg shadow-md font-bold" />
                       <div className='space-y-2 mt-2 mb-2 grid grid-cols-3 mx-auto items-baseline '>
                            <div className='mx-auto'>
                                <img src={CarIcon} alt="" /> <h1 className='text-xl ml-2'>{station.car}</h1>
                            </div>
                            <div className='mx-auto'>
                                <img src={BusIcon} alt="" /> <h1 className='text-xl ml-2'>{station.bus}</h1>
                            </div>
                            <div className='mx-auto'>
                                <img className='text-center' src={TruckIcon} alt="" /> <h1 className='text-xl ml-2'>{station.truck}</h1>
                            </div>
                        </div>
                    </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-800">Ish Vaqti</h3>
                {station.work_time && station.work_time.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-700 mb-6">
                        {station.work_time.map((time, index) => (
                            <li key={index}>
                                {daysOfWeek[index]}: {formatWorkTime(time)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 mb-6">Ish vaqtlari haqidagi ma'lumot mavjud emas !</p>
                )}

                <h3 className="text-xl font-semibold mb-3 text-gray-800">Narxlar</h3>
                {prices.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {prices.map(price => (
                            <div key={price.gasTypeName} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <p className="text-gray-700 font-medium">{price.gasTypeName}</p>
                                <p className="text-gray-700 font-semibold">{price.price}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No prices available</p>
                )}
            </div>
        </div>
    );
}
