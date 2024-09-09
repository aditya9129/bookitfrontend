import Header from "./Header";
import { Outlet } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import { UserContext } from './UserContext'
import { useContext } from "react";
export default function Layout(){
    const {User}=useContext(UserContext)
    return (
       <div>
            <div>
                <Header/>
                <Outlet/>
            </div>
       
        
       </div>

    )
}