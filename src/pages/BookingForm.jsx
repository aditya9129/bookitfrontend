import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext";
import { BASE_URL } from "../helper";

export default function Bookingform({id,price,photos}){
    console.log(id);
    console.log(price);
    const [guest,setguests]=useState('');
    const [name,setname]=useState('');
    const [tele,settele]=useState([]);
    const [checkin,setcheckin]=useState('');
    const [checkout,setcheckout]=useState('');
    const {User}=useContext(UserContext);
    async function submit(ev){
       ev.preventDefault();
        const resp = await fetch(`${BASE_URL}/booking`, {
            method: 'POST',
            body: JSON.stringify({User,id,name,guest,tele,
                price,checkin,checkout ,photos}),
            headers: { 'Content-Type': 'application/json' }
        });
        if(!resp.ok){
            alert('Place already booked');
        }
        else{
            alert('Booking confirm')
        }
   

    }
    return (
        
      <div className="flex flex-col items-center p-4">
      <form onSubmit={submit} className="w-full max-w-md">
        <label className="block mb-2">
          <span className="text-gray-700">Your Name:</span>
          <input
            className="rounded-lg px-3 py-2 border border-gray-300 w-full mt-1"
            placeholder="Enter your name"
            type="text"
            name="name"
            value={name}
            required
            onChange={(e) => setname(e.target.value)}
          />
        </label>
    
        <div className="flex justify-between mb-4">
          <label className="block w-1/2 mr-2">
            <span className="text-gray-700">Check-in Date:</span>
            <input
              className="rounded-lg px-3 py-2 border border-gray-300 w-full mt-1"
              placeholder="Select check-in date"
              type="date"
              name="checkin"
              value={checkin}
              required
              onChange={(e) => setcheckin(e.target.value)}
            />
          </label>
    
          <label className="block w-1/2 ml-2">
            <span className="text-gray-700">Check-out Date:</span>
            <input
              className="rounded-lg px-3 py-2 border border-gray-300 w-full mt-1"
              placeholder="Select check-out date"
              type="date"
              name="checkout"
              value={checkout}
              required
              onChange={(e) => setcheckout(e.target.value)}
            />
          </label>
        </div>
    
        <label className="block mb-4">
          <span className="text-gray-700">Maximum Guests:</span>
          <input
            className="rounded-lg px-3 py-2 border border-gray-300 w-full mt-1"
            placeholder="Enter maximum guests"
            type="number"
            name="guest"
            value={guest}
            required
            onChange={(e) => setguests(e.target.value)}
          />
        </label>
    
        <label className="block mb-4">
          <span className="text-gray-700">Phone Number:</span>
          <input
            className="rounded-lg px-3 py-2 border border-gray-300 w-full mt-1"
            placeholder="Enter phone number"
            type="tel"
            name="tele"
            value={tele}
            required
            onChange={(e) => settele(e.target.value)}
          />
        </label>
    
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-pink-600 text-white rounded-lg px-4 py-2 font-bold"
          >
            Reserve
          </button>
        </div>
      </form>
    </div>
    
    )
}