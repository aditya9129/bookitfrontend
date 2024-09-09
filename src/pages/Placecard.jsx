import { Link } from "react-router-dom";
export default function Placecard({ data }) {
    return (
        <Link to={`/place/${data?._id}`}> <div className=" m-2  w-72 rounded-lg">
        
        <div className=" w-full text-white">
          <img
            src={data?.photos[0]}
            alt="img"
            className="rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-1">
          <h1 className="text-">{data?.address}</h1>
          <p className=""><span className="font-bold"
          > Rs.{data?.price}</span> night</p>
        </div>
      </div></Link>
     
    );
  }
  