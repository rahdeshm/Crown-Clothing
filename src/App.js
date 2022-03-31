import {Routes,Route, Outlet} from 'react-router-dom'
import Home from './Routes/home/home.component'
import Navigation from './Routes/navigation/navigation.component'
import Authentication from './Routes/authentication/authentication.component'

const Shop=()=>{
return   <h2>I am shop page</h2>
}
const App=()=>{
  return (
    <Routes>
       <Route path='/' element={ <Navigation/>}>
          <Route index element={ <Home/>}/>
          <Route path='shop' element={<Shop/>}/>
          <Route path='auth' element={<Authentication/>}/>
       </Route>
    </Routes>
   
  )
}

export default App