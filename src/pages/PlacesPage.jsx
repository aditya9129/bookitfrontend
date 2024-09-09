import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Placesform from "./Placesform";
import { BASE_URL } from "../helper";

export default function PlacesPage() {
  const { User } = useContext(UserContext);
  const [add, setAdd] = useState(false);
  const [userPlaces, setUserPlaces] = useState([]);
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    async function getUserPlace() {
      if (User) {
        let resp = await fetch(`${BASE_URL}/userplaces`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        resp = await resp.json();
        setUserPlaces(resp);
      }
    }
    setDeleted(false);
    getUserPlace();
  }, [User, add,deleted]);
  

  const handleDelete = async ({id}) => {

    try {
      const response = await fetch(`${BASE_URL}/place/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
         credentials: 'include',


      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Assuming the response contains a success message
        setDeleted(true);
      } else {
        console.error('Failed to delete place');
      }
    } catch (error) {
      console.error('Error deleting place:', error);
      // Handle error, show message to user, etc.
    }
  };

  if (!User) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <div className="flex justify-center mt-3">
        <Link to={'/account'} className="p-2 rounded-3xl font-bold mx-5">My Profile</Link>
        <Link to={'/account/bookings'} className="p-2 rounded-3xl font-bold mx-5">My Bookings</Link>
        <Link to={'/account/places'} className="bg-pink-600 text-white p-2 rounded-3xl font-bold mx-5 hover:text-white">My Places</Link>
      </div>
      <div className="flex justify-center mt-3">
        <button className='bg-pink-600 text-white rounded-lg p-2 text-center font-bold' onClick={() => setAdd(true)}>+ Add new places</button>
      </div>

      {add && (
        <div className="bg-pink-100 text-center rounded-md w-[80%] mx-auto p-2 mt-2">
          <div className="flex p-4">
            <button className='bg-pink-600 text-white text-center font-bold mt-2 ml-auto rounded'  onClick={() => setAdd(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Placesform />
        </div>
      )}

      {!add && userPlaces &&  userPlaces.length > 0 && (
        <div className=" m-1 p-1 flex flex-col justify-center">
          {userPlaces.slice().reverse().map((data) => (
            <div key={data._id} className="bg-gray-200 m-2 rounded-md p-2 flex transition-transform duration-300 hover:scale-105">
              <div className="w-1/6 sm:w-1/6">
                <img className="rounded-lg" src={data.photos[0]} alt="img" />
              </div>
              <div className="w-3/4 sm:w-2/3 pl-2 flex flex-col gap-1">
                <h1 className="font-bold">{data.title}</h1>
                <p>{data?.address}</p>
                <p>CheckIn: {data?.checkin}</p>
                <p>CheckOut: {data?.checkout}</p>
                <p>Description: {data?.desc}</p>
                <p className="font-bold">Rs. {data?.price}</p>
                <div className="flex gap-2 ">
                  
                  <button onClick={()=>handleDelete({id:data._id})} className="bg-pink-600 rounded p-2 text-white">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
