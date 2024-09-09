import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Bookingdetails from "./Bookingdetails";
export default function     BookingsPage(){
    const {User}=useContext(UserContext);
    if(!User){
        return <Navigate to='/login' />
    }
    return (
        <div>
        <div className="flex justify-center mt-3">
        
        <Link to={'/account'} className="p-2 rounded-3xl  font-bold mx-5  ">My Profile</Link>
        <Link to={'/account/bookings'} className="bg-pink-600 p-2 rounded-3xl text-white font-bold mx-5">My Bookings</Link>
        <Link to={'/account/places'} className=" p-2 rounded-3xl font-bold mx-5 ">My Places</Link>
        </div>
        <Bookingdetails/>
    </div>
    );
}