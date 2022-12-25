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
import ProtectedRoute from './ProtectedRoute.js';
import MainApi from '../utils/MainApi.js';
import MoviesApi from '../utils/MoviesApi.js';

function App() {

  function handleToken() {
    const jwt = localStorage.getItem('token');
    if(!jwt) {
      return;
    }
    return jwt;
  }

  const token = handleToken();
  
  const apiMain = new MainApi('https://api.kh-evelina.movies.nomoredomains.icu', token);
  const apiMovies = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');
  const [currentUser, setCurrentUser] = React.useState({_id: '', name: '', email: ''});
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('loggedIn'));
  const [register, setRegistr] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [movieCard, setMovieCard] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const detectWindowWidth = () => {
    setTimeout(setWindowWidth(window.innerWidth), 2000);
  }
  const [sliceMovie, setSliceMovie] = React.useState(1);
  const [checked, setChecked] = React.useState(false);
  const [item, setItem] = React.useState([]);
  const [onSubmit, setOnSubmit] = React.useState(false);
  const [filterMovies, setFilterMovies] = React.useState([]);

  function handleClickCheckbox(mov) {
    setChecked(!checked);
    const newItem = mov.filter((newVal) => {
      if (newVal.duration <= 40) {
        return newVal;
      }
    });
    setItem(newItem);
  }

  React.useEffect(() => {
    window.addEventListener('resize', detectWindowWidth);
    return () => {
      window.removeEventListener('resize', detectWindowWidth);
    }
  }, [windowWidth]);

  function handleClickMoreLoad() {
    setSliceMovie(sliceMovie + 1);
  }

  function getRenderMoviesToDisplay() {
    if (windowWidth > 768) {
      return 3;
    }
    else if (windowWidth > 480) {
      return 2;
    }
    else {
      return 5;
    }
  }

  React.useEffect(() => {
    if (loggedIn) {
      apiMain.getUser()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Отсутствует токен' || err === 'Пользователь не авторизирован') {
          navigate('/', {replace: true});
          localStorage.clear();
          setSavedMovies([]);
          setLoggedIn(false);
        }
      })
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if(loggedIn) {
      apiMovies.getMovies()
      .then((res) => {
        setMovieCard(res);
      })
      .catch((err) => {
        console.log(err);
        navigate('/', {replace: true});
        localStorage.clear();
        setLoggedIn(false);
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      apiMain.getSavedMovies()
      .then((res) => {
        setSavedMovies(res.data);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      tokenCheck();
    }
  }, [loggedIn]);

  function tokenCheck() {
    handleToken()
    apiMain.getToken()
    .then((res) => {
      setCurrentUser({
        _id: res._id,
        name: res.name,
        email: res.email,
      });
      setLoggedIn(true);
    })
    .catch((err) => {
      console.log(err);
      navigate('/', {replace: true});
      localStorage.clear();
      setLoggedIn(false);
    });
  }

  React.useEffect(() => {
    setLoggedIn(false);
    tokenCheck();
  }, []);

  function requestSaveMovie(movie) {
    const image=`https://api.nomoreparties.co${movie.image.url}`;
    const thumbnail=`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
    const {
      country,
      duration,
      director,
      year,
      description,
      id,
      trailerLink,
      nameRU,
      nameEN,
    } = movie;
    apiMain.createMovie({
      country,
      duration,
      director,
      year,
      description,
      movieId: id,
      trailerLink,
      nameRU,
      nameEN,
      image,
      thumbnail,
    })
    .then((newMovie) => {
      setSavedMovies([newMovie, ...savedMovies]);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function requestDeleteMovie(movie) {
    apiMain.deleteMovie(movie._id)
    .then((res) => {
      setSavedMovies((state) => state.filter((s) => s._id !== res._id));
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  function handleRegisterUser({name, email, password}) {
    setIsLoading(true);
    return apiMain.registerUser({name, email, password})
      .then(() => {
        setRegistr(true);
        navigate('/signin', {replace: true});
      })
      .catch((err) => {
        setRegistr(false);
        console.log(err.message);
        navigate('/signup', {replace: true});
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleLoginUser({email, password}) {
    setIsLoading(true);
    return apiMain.loginUser({email, password})
      .then(() => {
        setLoggedIn(() => {
          localStorage.setItem('loggedIn', true);
          return true;
        });
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditUser({name, email}) {
    setIsLoading(true);
    apiMain.editUser(name, email)
    .then((res) => {
      console.log(res);
      setCurrentUser({name: res.name, email: res.email});
    })
    .catch((err) => {
      console.log(err.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/', {replace: true});
  }

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      <>
        <Routes>
          <Route path="/" exact element={
            <Main
              isLoading={isLoading}
            />
          }>
          </Route>
          <Route path='/movies' element={
            <ProtectedRoute
              loggedIn={loggedIn}
              path='/movies'
              component={Movies}
              isLoading={isLoading}
              requestSaveMovie={requestSaveMovie}
              requestDeleteMovie={requestDeleteMovie}
              setOpenMenu={setOpenMenu}
              movies={movieCard}
              getRenderMoviesToDisplay={getRenderMoviesToDisplay}
              handleClickMoreLoad={handleClickMoreLoad}
              sliceMovie={sliceMovie}
              checked={checked}
              item={item}
              handleClickCheckbox={handleClickCheckbox}
              setFilterMovies={setFilterMovies}
              setOnSubmit={setOnSubmit}
              onSubmit={onSubmit}
              filterMovies={filterMovies}
            />
          }>
          </Route>
          <Route path='/saved-movies' element={
            <ProtectedRoute
              loggedIn={loggedIn}
              path='/saved-movies'
              component={SavedMovies}
              isLoading={isLoading}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              requestSaveMovie={requestSaveMovie}
              requestDeleteMovie={requestDeleteMovie}
              setOpenMenu={setOpenMenu}
              getRenderMoviesToDisplay={getRenderMoviesToDisplay}
              handleClickMoreLoad={handleClickMoreLoad}
              sliceMovie={sliceMovie}
              checked={checked}
              item={item}
              handleClickCheckbox={handleClickCheckbox}
              setFilterMovies={setFilterMovies}
              setOnSubmit={setOnSubmit}
              onSubmit={onSubmit}
              filterMovies={filterMovies}
            />
          }
          >
          </Route>
          <Route path='/profile' element={
            <ProtectedRoute
              loggedIn={loggedIn}
              path='/profile'
              component={Profile}
              signOut={handleSignOut}
              isLoading={isLoading}
              handleEditUser={handleEditUser}
              userInfo={currentUser}
              setOpenMenu={setOpenMenu}
            />
          }>
          </Route>
          <Route path='/signin' element={
            <Login
              logged={handleLoginUser}
              isLoading={isLoading}
            />
          }>
          </Route>
          <Route path='/signup' element={
            <Register
              register={handleRegisterUser}
              isLoading={isLoading}
            />
          }>
          </Route>
          <Route path='*' element={
             <ErrorMessage />
          }>
          </Route>
        </Routes>
        <NavTab
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;