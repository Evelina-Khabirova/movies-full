import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Main from './Main.js';
import Movies from './Movies.js';
import SavedMovies from './SavedMovies.js';
import Login from './Login.js';
import Register from './Register.js';
import Profile from './Profile.js';
import ErrorMessage from './ErrorMessage.js';
import NavTab from './NavTab.js';
import ApiAuth from '../utils/ApiAuth.js';

function App() {

  function handleToken() {
    const jwt = localStorage.getItem('token');
    if(!jwt) {
      return;
    }
    return jwt;
  }

  const token = handleToken();

  const apiAuth = new ApiAuth('https://api.kh-evelina.movies.nomoredomains.icu');
  const [currentUser, setCurrentUser] = React.useState({name: '', email: ''});
  const [isRegister, setIsRegister] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [statusRegister, setStatusRegistr] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState({'_id': '', 'name': '', 'email': ''});
  const [openNavTab, setOpenNavTab] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      getLoginData();
    }
  }, [loggedIn]);

  function getLoginData() {
    apiAuth.getToken()
    .then((res) => {
      setUserInfo({
        '_id': res._id,
        'email': res.email,
      });
      setLoggedIn(true);
    })
    .catch((err) => console.log(err))
  }

  function tokenCheck() {
    handleToken()
    apiAuth.getToken()
    .then((res) => {
      setCurrentUser(res.data);
      setLoggedIn(true);
    })
    .catch((err) => console.log(err));
  }
  
  React.useEffect(() => {
    setLoggedIn(false);
    tokenCheck();
  }, []);

  function handleRegisterClick() {
    setIsRegister(true);
  }
  
  function handleRegisterUser({name, email, password}) {
    return apiAuth.registerUser({name, email, password})
      .then((res) => {
        setStatusRegistr(true);
        navigate('/signin', {replace: true});
        handleRegisterClick();
      })
      .catch(() => {
        setStatusRegistr(false);
        navigate('/signup', {replace: true});
        handleRegisterClick();
      });
  }

  function handleLoginUser({email, password}) {
    return apiAuth.loginUser({email, password})
      .then((res) => {
        setCurrentUser({'email': email});
        setLoggedIn(() => {
          localStorage.setItem('loggedIn', true);
          return true;
        });
        navigate('/movies', {replace: true});
      })
      .catch((err) => console.log(err));
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    navigate('/', {replace: true});
  }

  return (
    <CurrentUserContext.Provider value={[openNavTab, setOpenNavTab]}>
      <>
        <Routes>
          <Route path="/" exact element={
            <Main />
          }>
          </Route>
          <Route path="/movies" element={
            <Movies />
          }>
          </Route>
          <Route path='/saved-movies' element={
            <SavedMovies />
          }
          >
          </Route>
          <Route path='/profile' element={
            <Profile
              signOut={handleSignOut}
            />
          }>
          </Route>
          <Route path='/signin' element={
            <Login
              logged={handleLoginUser}
            />
          }>
          </Route>
          <Route path='/signup' element={
            <Register
              register={handleRegisterUser}
            />
          }>
          </Route>
          <Route path='*' element={
             <ErrorMessage />
          }>
          </Route>
        </Routes>
        <NavTab
          isOpen={openNavTab}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;