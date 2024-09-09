import { Routes ,Route} from 'react-router-dom'
import './App.css'
import Loginpage from './pages/Loginpage'
import Index from './pages/Index'
import Layout from './Layout'
import Registerpage from './pages/Registerpage'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage'
import BookingsPage from './pages/BookingsPage'
import PlacesPage from './pages/PlacesPage'
import PlaceInfo from './pages/PlaceInfo'
function App() {


  return (
    < UserContextProvider>
    <Routes>
       <Route path="/" element={<Layout/>}>
       <Route index element={<Index/>}/>
       <Route path='/login' element={<Loginpage/>}/>
       <Route path='/register' element={<Registerpage/>}/>
       <Route path='/account' element={<AccountPage/>}/>
       <Route path='/account/bookings' element={<BookingsPage/>}/>
       <Route path='/account/places' element={<PlacesPage/>}/>
       <Route path='/place/:id' element={<PlaceInfo/>}/>
       </Route>
    </Routes>
    </UserContextProvider>
  )
}


export default App
