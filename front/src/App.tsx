
/// <reference types="vite-plugin-svgr/client" />

import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";
import PostDetail from "./pages/PostDetail";
import ProtectedRoute from "./route/ProtectedRoute";
import AuthForm from "./components/AuthForm";
import PublicRoute from "./route/PublicRoute";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./animations/PageTransition";

function App() {

  const location = useLocation();
  if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
  return (
  <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute/>}>
            <Route path='/' element={<PageTransition><Home/></PageTransition>}/>
            <Route path='/user/*' element={<PageTransition><Profile/></PageTransition>}/>
            <Route path='/post/*' element={<PageTransition><PostDetail/></PageTransition>}/>
          </Route>

          {/* Rutas Publicas */}
          <Route element={<PublicRoute/>}>
            <Route path='/welcome' element={<PageTransition><Welcome/></PageTransition>}/>
            <Route path='/login' element={<PageTransition><AuthForm tipo="login"/></PageTransition>}/>
            <Route path='/signup' element={<PageTransition><AuthForm tipo="signup"/></PageTransition>}/>
          </Route>
          
          <Route path='/*' element={<PageTransition><Error404/></PageTransition>}/>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
