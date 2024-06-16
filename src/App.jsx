import './App.css';

import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useState,useEffect } from 'react';
import { AuthProvider } from './Context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthLoginRegister } from './Api/Firebase/AuthLoginRegister'; 


import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import SelectPlano from './pages/SelectPlano';
import Cadastro from './pages/Cadastro';
import Media from './pages/Media';
import MediaTV from './pages/MediaTV';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Dashbord from './pages/Dashbord';


function App() {
  const loc = useLocation();

  const [user, setUser] = useState(undefined);
  const { auth } = AuthLoginRegister();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    });
  }, [auth]);

  if (loadingUser) {
    return <p></p>;
  }

      return(
        <div className="App">
     <AuthProvider value={{user}}>
      <Header/>

    <motion.div 
    initial={{opacity:  0}}
    animate={{ opacity: 1 }} >
     <AnimatePresence>
        <Routes location={loc} key={loc.pathname}>
          <Route path="/" element={<Home></Home>}/>
          <Route path="/login" element={!user ? <Login/>: <Navigate to="/"> </Navigate>}></Route>
          <Route path="/selecionaplano" element={!user ? <SelectPlano/>: <Navigate to="/"> </Navigate>}></Route>
          <Route path="/cadastro/:plan" element={!user ? <Cadastro/>: <Navigate to="/"> </Navigate>}></Route>
          <Route path="/media/:id" element={user ? <Media/>: <Navigate to="/"> </Navigate>}></Route>
          <Route path="/mediatv/:id" element={user ? <MediaTV/>: <Navigate to="/"> </Navigate>}></Route>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/series" element={<Series/>}/>
          <Route path="/dashbord" element={user ? <Dashbord/>: <Navigate to="/"> </Navigate>}></Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
     </AnimatePresence>

        <Footer></Footer> 
    </motion.div>
    </AuthProvider >
        </div>

  )
}

export default App;
