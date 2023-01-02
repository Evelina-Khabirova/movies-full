import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [disabledMore, setDisabledMore] = React.useState(false);
  const [likes, setLikes] = React.useState([]);
  const {pathname} = useLocation();
  const [arrSavedLikes, setArrSavedLikes] = React.useState([]);

  function handleClickCheckbox(mov) {
    setChecked(!checked);
    localStorage.setItem('Checked', !checked);
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
    if(loggedIn) {
      apiMovies.getMovies()
      .then((res) => {
        setMovieCard(res);
        if(localStorage.getItem('Checked') === 'true') {
          setChecked(true);
          const newItem = res.filter((newVal) => {
            if (newVal.duration <= 40) {
              return newVal;
            }
          });
          setItem(newItem);
          const checkboxButton = document.getElementById('form-checkbox');
          checkboxButton.checked = true;
        }
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
        setArrSavedLikes(res.data.map(elem => {return elem.movieId}));
        setDisabledMore(false);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      apiMain.getUser()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        navigate(`${pathname}`, {replace: true});
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
    let id;
    function findId () {
      const arr = savedMovies.find(elem => {
        if (elem.movieId === movie.id) {
          return elem._id;
        }
      });
      id = arr._id;
    }
    switch(pathname) {
      case '/movies':  findId(); break;
      case '/saved-movies': id = movie._id; break;
    }
    apiMain.deleteMovie(id)
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
        handleLoginUser({email, password});
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
    const notification = document.querySelector('.profile__notification');
    apiMain.editUser(name, email)
    .then((res) => {
      setCurrentUser({name: res.name, email: res.email});
    })
    .catch((err) => {
      console.log(err.message);
      notification.classList.remove('profile__notification_active');
    })
    .finally(() => {
      setIsLoading(false);
    });
    notification.classList.add('profile__notification_active');
  }

  function handleSignOut() {
    localStorage.removeItem('Checked');
    localStorage.removeItem('SearchValue');
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
              loggedIn={loggedIn}
              setOpenMenu={setOpenMenu}
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
              setChecked={setChecked}
              item={item}
              handleClickCheckbox={handleClickCheckbox}
              setFilterMovies={setFilterMovies}
              likes={likes}
              setLikes={setLikes}
              arrSavedLikes={arrSavedLikes}
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
              disabledMore={disabledMore}
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