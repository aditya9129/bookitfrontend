import { useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import BookingForm from "./BookingForm";
import { BASE_URL } from "../helper";

export default function PlaceInfo(){
    let { id } = useParams();
    const [data, setdata] = useState('');
    useEffect(() => {
      async function getPlace() {
        let place = await fetch(`${BASE_URL}/place/${id}`, {
          method: 'GET',
          credentials: 'include',
        });
        place = await place.json();
        setdata(place);
      }
  
      getPlace();
      
    }, []);
    if(!data){
        return <h1>Loading...</h1>
    }
    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-bold text-3xl mb-6">{data.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {data.photos.slice(0, 4).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Place ${index + 1}`}
                    className={`w-full h-48 object-cover rounded-lg ${index === 0 ? 'col-span-2' : ''}`}
                  />
                ))}
              </div>
              
              <div className="bg-gray-100 rounded-lg p-6">
                <h2 className="font-bold text-xl mb-2">About this place</h2>
                <p className="text-gray-700">{data.desc}</p>
                <div className="mt-4 space-y-2">
                  <p><strong>Address:</strong> {data.address}</p>
                  <p><strong>Max guests:</strong> {data.maxGuests}</p>
                </div>
              </div>
            </div>
    
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-bold text-2xl mb-4">Book this place</h2>
              <p className="text-xl mb-4">Rs. {data.price} <span className="text-gray-500 text-base">per night</span></p>
              <BookingForm id={id} price={data.price} photos={data.photos} />
            </div>
          </div>
        </div>
      );
}