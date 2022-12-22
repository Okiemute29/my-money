import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './component/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import { PrivateRoute, AllowededRoute } from './component/routeguard/privateroute';

function App() {
  const {authIsReady} = useAuthContext()
  return (
    <div className="App">
      {authIsReady &&
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route element={<PrivateRoute />} >
              <Route path='/' element={<Home /> } />
            </Route>
            <Route element={<AllowededRoute />} >
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} /> 
            </Route> 
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App
