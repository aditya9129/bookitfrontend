import { Link } from "react-router-dom";
import { UserContext } from './UserContext'
import { useContext } from "react";
export default function Header(){
     const {User}=useContext(UserContext)
    return ( <header className='p-2 flex justify-between'>
    <a className='flex gap-1 p-2 items-center' href="/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
         </svg><span className='font-bold text-xl'>BookIt</span>
   </a>


   <div className='flex justify-center  border border-gray-400 font-bold items-center p-2 rounded-l-3xl rounded-r-3xl shadow-md'>
    <div>Pick you Paradise</div>
    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M50 95c0 0 5-30 5-45 0-15-5-40-5-40 0 0-5 25-5 40 0 15 5 45 5 45" fill="#FFA07A"/>
  <path d="M50 10c0 0-25 15-35 25 0 0 20-5 35-10 15 5 35 10 35 10 -10-10-35-25-35-25" fill="#FFB6C1"/>
  <path d="M50 20c0 0-20 10-30 20 0 0 15-5 30-10 15 5 30 10 30 10 -10-10-30-20-30-20" fill="#FFC0CB"/>
  <path d="M50 30c0 0-15 5-25 15 0 0 10-5 25-10 15 5 25 10 25 10 -10-10-25-15-25-15" fill="#FFDDDD"/>
</svg> */}
    
   </div>


   < Link to={User?'/account':'/login'} className='flex justify-center gap-2 border  border-gray-400 font-bold items-center p-2 rounded-l-3xl rounded-r-3xl shadow-md'>
   <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
       <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
       </svg>
  </div>
  <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
       <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
      </svg>
      
    </div>
  {!!User && (<div>{User.name}</div>)}
   </Link>
   
 


   </header>)
}