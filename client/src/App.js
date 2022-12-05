import React, { Fragment, useState, useContext } from  'react';
import Card from './components/UI/Card';
import Login from './components/auth/login';
import SignUp from './components/auth/signup';
import Home from './components/main/home';
import Profile from './components/main/profile';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthContext from './store/auth-context';
import { HomeContextProvider } from './store/home-context';

function App() {
  const ctxUser = useContext(AuthContext);
  const navigateToRoot = <Navigate to='/' />;
  const authRoutes = 
  <Fragment>
    <Route path='/login' element={navigateToRoot} />
    <Route path='/signup' element={navigateToRoot} />
    <Route path='/home' element={navigateToRoot} />
    <Route path='/profile' element={<Card headerClasses="bg-white-only" className="custom"><Profile/></Card>} />
    <Route path='*' element={<div>404 not found</div>} />
  </Fragment>;

  return (
    <HomeContextProvider>
      <Routes>
        <Route path='/' element={ctxUser.email === '' ? <Login/> : <Card headerClasses="bg-white-only" className="custom"><Home/></Card>} />
        { ctxUser.email === '' && 
          <Fragment>
            <Route path='/signup' element={<SignUp/>} />
            <Route path='*' element={<Login/>} />
          </Fragment>
        }
        { ctxUser.email !== '' && authRoutes }
      </Routes>
    </HomeContextProvider>  
  );
}

export default App;