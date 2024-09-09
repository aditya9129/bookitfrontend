import { useEffect, useState } from "react";
import Placecard from "./Placecard";
import { BASE_URL } from "../helper";
import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate} from "react-router-dom";
export default function Index() {
  const {User}=useContext(UserContext);
    if(!User){
        return <Navigate to='/login' />
    }
  const [allplaces, setAllplaces] = useState([]);

  useEffect(() => {
    async function getAllPlaces() {
      let places = await fetch(`${BASE_URL}/allplaces`, {
        method: 'GET',
        credentials: 'include',
      });
      places = await places.json();
      setAllplaces(places);
    }

    getAllPlaces();
  }, []);

  return (
    <div className="w-full">
      {allplaces && allplaces.length > 0 && (
        <div className="w-full flex flex-wrap justify-around">
          {allplaces.map((data) => (
            <Placecard data={data} key={data?._id} />
          ))}
        </div>
      )}
    </div>
  );
}
