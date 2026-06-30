import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";
import PostDetail from "./pages/PostDetail";
import ProtectedRoute from "./route/ProtectedRoute";
import AuthForm from "./components/AuthForm";
import PublicRoute from "./route/PublicRoute";
import Footer from "./components/Footer";
function App() {

  return (<>
    <Routes>
      {/* Rutas Protegidas para logueados*/}
      <Route element={<ProtectedRoute/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/*' element={<Profile/>}/>
        <Route path='/post/*' element={<PostDetail/>}/>
      </Route>

      {/* Rutas  para no logueados*/}
      <Route element={<PublicRoute/>}>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/login' element={<AuthForm tipo="login"/>}/>
        <Route path='/signup' element={<AuthForm tipo="signup"/>}/>
      </Route>
      
      <Route path='/*' element={<Error404/>}/>
    </Routes>
    </>
  )
}

export default App
