// import { useContext, useState } from "react"
// import { UserContext } from "../UserContext"
// import { Navigate, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { BASE_URL } from "../helper";

// export default function AccountPage(){
//     const {User,setUser}=useContext(UserContext);
//     const [lgout,setlgout]=useState(false);
//     const navigate=useNavigate();
//     if(!User || lgout){
//         return <Navigate to='/login' />
//     }
//     async function logout(){
//         await fetch(`${BASE_URL}/logout`, {
//             method: 'POST',
//             credentials:'include'
//         });
//         setlgout(true);
//         setUser(null);
//     }
//     return(
//         <div>
//         <div className="flex justify-center mt-3">
//             <Link to={'/account'} className="bg-pink-600 p-2 rounded-3xl text-white font-bold mx-5">My Profile</Link>
//             <Link to={'/account/bookings'} className="p-2 rounded-3xl  font-bold mx-5 ">My Bookings</Link>
//             <Link to={'/account/places'} className=" p-2 rounded-3xl font-bold mx-5   ">My Places</Link>
//         </div>
//         <div className="flex justify-center mt-3">
//             <div>
            
//             <h2 className="text-2xl p-2 ">User Details</h2>
//             <h3 className="p-2 ">Name : {User?.name}</h3>
//             <h3 className="p-2"> Email : {User?.email}</h3>

//            <div className="flex gap-2">
            
//             <button  className='bg-pink-600 text-white rounded-3xl p-1 w-full font-bold' onClick={() => {navigate('/')}}>Home</button>
//             <button  className='bg-pink-600 text-white rounded-3xl p-1 w-full font-bold' onClick={logout}>Log Out</button>

//             </div> 

//             </div>
            

//         </div>
//         </div>
//     )
// }

























import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BASE_URL } from "../helper";

export default function AccountPage() {
    const { User, setUser } = useContext(UserContext);
    const [logout, setLogout] = useState(false);
    const navigate = useNavigate();

    if (!User || logout) {
        return <Navigate to='/login' />;
    }

    async function handleLogout() {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            setUser(null);
            setLogout(true);
        } else {
            // Handle error if needed
            console.error('Failed to log out');
        }
    }

    return (
        <div>
            <div className="flex justify-center mt-3">
                <Link to={'/account'} className="bg-pink-600 p-2 rounded-3xl text-white font-bold mx-5">My Profile</Link>
                <Link to={'/account/bookings'} className="p-2 rounded-3xl font-bold mx-5">My Bookings</Link>
                <Link to={'/account/places'} className="p-2 rounded-3xl font-bold mx-5">My Places</Link>
            </div>
            <div className="flex justify-center mt-3">
                <div>
                    <h2 className="text-2xl p-2">User Details</h2>
                    <h3 className="p-2">Name: {User?.name}</h3>
                    <h3 className="p-2">Email: {User?.email}</h3>
                    <div className="flex gap-2">
                        <button className="bg-pink-600 text-white rounded-3xl p-1 w-full font-bold" onClick={() => { navigate('/') }}>Home</button>
                        <button className="bg-pink-600 text-white rounded-3xl p-1 w-full font-bold" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
