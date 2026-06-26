import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";
import PostDetail from "./pages/PostDetail";


function App() {

  return (<>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/welcome' element={<Welcome/>}/>
      <Route path='/user/*' element={<Profile/>}/>
      <Route path='/post/*' element={<PostDetail/>}/>
      <Route path='/*' element={<Error404/>}/>
    </Routes>
    </>
  )
}

export default App
