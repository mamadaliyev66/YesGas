import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/config"; // Assuming you have db/firestore exported from config

export default function DocumentComponent() {
  const [computersData, setComputersData] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Real-time listener using onSnapshot
    const collectionRef = collection(firestore, 'updateDoc');

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const fetchedData = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data() // Fetch the document data
      }));
      setComputersData(fetchedData); // Set the fetched data into state

      // Show notification when data updates
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
    }, (error) => {
      console.error('Error fetching real-time data:', error);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className=" h-screen bg-gray-100">
      {/* Notification bar */}
      {showNotification && (
        <div className="fixed top-0 left-0 w-full bg-green-600 animate-pulse text-white text-center py-2 z-50">
          <p>Updated!</p>
        </div>
      )}

      <div className="h-screen  "> {/* Padding to prevent content overlap with notification */}
        {computersData.length > 0 ? (
          computersData.map((computer, i) => {
            return (
              <div key={i} className="w-full  max-w-md mx-auto mb-4">
                <div className="bg-gray-800 pt-16 h-screen border-gray-700">
                  <a href="#">
                    <img className="rounded-t-lg p-6 w-full object-cover h-auto" src={computer.image_url} alt={computer.field_1} />
                  </a>
                  <div className="p-5">
                    {/* Dynamically render all fields except the image */}
                    {Object.keys(computer).map((key) => {
                      if (key !== 'image_url') { // Skip the image field
                        return (
                          <div key={key} className="mb-2">
                           
                            <span className="text-gray-600 dark:text-gray-300">{computer[key]}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center pt-32">
          <div
    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
  </div>
          
          </div>
        )}
      </div>
    </div>
  );
}
