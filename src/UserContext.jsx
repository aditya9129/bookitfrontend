import { createContext, useEffect, useState } from "react";
export const UserContext=createContext({});
import { BASE_URL } from "./helper";
export function UserContextProvider({children}){
    const [User,setUser]=useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const resp = await fetch(`${BASE_URL}/profile`, {
              method: 'GET',
              credentials:'include'
            });
            if (resp.ok) {
              const userData = await resp.json(); 
              // Assuming the server sends user data in response    
              setUser(userData);
              // console.log(userData);
            } else {
              throw new Error('Fetching cookies failed');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }finally {
        setLoading(false); // Set loading to false after fetching data
      }
        };
    
        if (!User) {
          fetchData();
        }
      }, [User]);
    return(

     
<UserContext.Provider value={{ User, setUser }}>
{!loading ? children : <div>Loading...</div>} {/* Display loading indicator */}
</UserContext.Provider>
    );
}