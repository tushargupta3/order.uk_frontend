
import './App.css'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import { Register, Login, Home ,Checkout ,Profile ,Share} from './pages'
import Product from './pages/product/product'
import { useEffect,useState } from 'react';
import {getUserInfo} from './services/auth';
import {UserContext} from './contexts/userContext';

function App() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getData = async () => {
      const userInfo = await getUserInfo()
      setUserInfo(userInfo.data)
    }
    getData()
  }, [])

  return (
    <UserContext.Provider value={userInfo}>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/restaurant/:id' element={<Product />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/share/:id' element={<Share />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App