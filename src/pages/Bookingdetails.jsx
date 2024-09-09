import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../helper";

export default function BookingDetails() {
  const [userBookings, setUserBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUserBookings() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/userbookings`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setUserBookings(data);
      } catch (err) {
        console.error('Error fetching user bookings:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getUserBookings();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (userBookings.length === 0) {
    return <div className="text-center mt-10">No bookings found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {userBookings.slice().reverse().map((booking) => (
          <Link 
            to={`/place/${booking?.placeid}`} 
            key={booking._id}
            className="block bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img 
                  className="h-48 w-full object-cover md:w-48" 
                  src={booking.photos[0]} 
                  alt={booking.title}
                />
              </div>
              <div className="p-8">
                <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{booking.title}</h2>
                <p className="mt-2 text-gray-500">Booked by <span className="font-semibold">{booking?.name}</span></p>
                <p className="mt-2 text-gray-500">Guests: {booking?.guests_no}</p>
                <p className="mt-2 text-gray-500">Check-in: {new Date(booking?.checkin).toLocaleDateString()}</p>
                <p className="mt-2 text-gray-500">Check-out: {new Date(booking?.checkout).toLocaleDateString()}</p>
                <p className="mt-2 text-xl font-bold text-gray-900">₹{booking?.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
// import { useContext, useEffect, useState } from "react"
// import { Link } from "react-router-dom";
// import { BASE_URL } from "../helper";

// export default function Bookingdetails(){
//     const [userbookings,setuserbookings]=useState([]);
//     useEffect(()=>{
//         async function getuserbookings(){
//             let resp=await fetch(`${BASE_URL}/userbookings`,{
//                 method:'GET',
//                 credentials:'include',

//             })
//             resp=await resp.json();
//             setuserbookings(resp);
//            console.log(userbookings);

//         }
//        getuserbookings();
//     },[])   
    
//     if(userbookings.length==0){
//         return <h1>Loading...</h1>
//     }
//     return (
//         <div>
   

// <div className="w-full">
// {userbookings && userbookings.length>0 && 

//     <div className="m-1 p-1 w-full">

// {userbookings.slice().reverse().map((data) => (
//   <Link className="flex justify-center transition-transform duration-300 hover:scale-105" to={`/place/${data?.placeid}`} key={data._id}> {/* Wrap the Link properly */}
//     <div className="bg-gray-200 m-2 flex rounded-md p-2" key={data._id}>
//       <div className="w-1/6 sm:w-1/6">
//         <img className="rounded-lg" src={data.photos[0]} alt="img" />
//       </div>
//       <div className="w-2/4 sm:w-2/3 pl-2 flex flex-col gap-1">
//         <h1 className="font-bold">{data.title}</h1>
//         <p>Booked by <span className="font-bold">{data?.name} </span></p>
//         <p>Booked for {data?.guests_no} guests</p>
//         <p>CheckOut: {data?.checkout}</p>
//         <p>CheckIn: {data?.checkin}</p>
        
//         <p className="font-bold">Rs. {data?.price}</p>
        
//       </div>
//     </div>
//   </Link>
// ))}

    

//     </div>

// }
// </div>
//     </div>
    
//     );
// }





// {!add && userPlaces.length > 0 && (
//   <div className="w-full m-1 p-1">
//     {userPlaces.slice().reverse().map((data) => (
//       <div key={data._id} className="bg-pink-200 m-1 rounded-md p-2 flex">
//         <div className="w-1/6 sm:w-1/6">
//           <img src={data.photos[0]} alt="img" />
//         </div>
//         <div className="w-2/4 sm:w-2/3 pl-2">
//           <h1 className="font-bold">{data.title}</h1>
//           <p>CheckIn: {data?.checkin}</p>
//           <p>CheckOut: {data?.checkout}</p>
//           <p className="font-bold">Rs. {data?.price}</p>
//           <div className="flex gap-2 mt-4">
            
//             <button onClick={()=>handleDelete({id:data._id})} className="bg-pink-600 rounded-lg p-2 text-white">Delete</button>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// )}









// (
//   <Link to={`/place/${data?.placeid}`} key={data._id}>
// <div key={data._id} className="bg-pink-200 m-1 rounded-md p-2 flex  ">
// <div className="w-1/6 sm:w-1/6">
//   <img
//     src={data.photos[0]} 
//     alt="img"
//     className=""
//   />
// </div>
// <div className="w-2/4 sm:w-2/3 pl-2">
//   <h1 className="font-bold">{data.name}</h1>
//   <p>CheckIn : {data?.checkin}</p>
//   <p>CheckOut : {data?.checkout}</p>
//   <p className="font-bold">Rs. {data?.price}</p>
//   <div className=" flex gap-2 mt-4">
//   </div>
// </div>
// </div>
// </Link>
// )