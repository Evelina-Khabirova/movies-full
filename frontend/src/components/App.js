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
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = React.useState([]);
  const {pathname} = useLocation();
  const [arrSavedLikes, setArrSavedLikes] = React.useState([]);
  const [displayMovies, setDisplayMovies] = React.useState(0);

  React.useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      tokenCheck();
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (filterSavedMovies.length > 0) {
      if (pathname !== '/saved-movies') {
        setFilterSavedMovies([]);
      }
    }
  });

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
      return sliceMovie * 3;
    }
    else if (windowWidth > 480 && windowWidth <= 768) {
      return sliceMovie * 2;
    }
    else {
      return sliceMovie * 5;
    }
  }

  function isDisabledMore(how) {
    if (windowWidth > 768) {
      return sliceMovie * 3 >= how;
    }
    else if (windowWidth > 320 && windowWidth <= 768) {
      return sliceMovie * 2 >= how;
    }
    else {
      return sliceMovie * 5 >= how;
    }
  }

  function requestFilterMovies(movies, searchWord, checkbox) {
    const notification = document.querySelector('.search__notification');
    let searchMovies = movies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (checkbox) {
      searchMovies = searchMovies.filter((newVal) => {
        if (newVal.duration <= 40) {
          return newVal;
        }
      });
    }
    if (pathname === '/movies') {
      setFilterMovies(searchMovies);
    }
    else if (pathname === '/saved-movies') {
      setFilterSavedMovies(searchMovies);
    }
    if (searchMovies.length === 0) {
      notification.classList.add('search__notification_active');
    }
    else {
      notification.classList.remove('search__notification_active');
    }
  }
  
  React.useEffect(() => {
    if(loggedIn) {
      apiMovies.getMovies()
      .then((res) => {
        const searchWord = localStorage.getItem('SearchValue');
        if (searchWord) {
          let checkbox;
          if (localStorage.getItem('Checked') === 'true') {
            checkbox = true;
          }
          else {
            checkbox = false;
          }
          requestFilterMovies(res, searchWord, checkbox);
        }
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
        setArrSavedLikes(res.data.map(elem => {return elem.movieId}));
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
    .then((res) => {
      setSavedMovies([res.data, ...savedMovies]);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function requestDeleteMovie(movie) {
    let id;
    function findId(movie) {
      const arr = savedMovies.find(elem => {
        if (elem.movieId === movie.id) {
          return elem._id;
        }
      });
      id = arr._id;
    }
    switch(pathname) {
      case '/movies':  findId(movie); break;
      case '/saved-movies': id = movie._id; break;
    }
    apiMain.deleteMovie(id)
    .then((res) => {
      setSavedMovies((state) => state.filter((s) => s._id !== res._id));
      if (filterSavedMovies.length > 0) {
        setFilterSavedMovies((state) => state.filter((s) => s._id !== res._id));
      }
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
    notification.textContent = 'Вы успешно изменили данные!';
    notification.classList.add('profile__notification_active');
  }

  function handleSignOut() {
    localStorage.removeItem('Checked');
    localStorage.removeItem('SearchValue');
    localStorage.removeItem('token');
    setMovieCard([]);
    setSavedMovies([]);
    setFilterMovies([]);
    setFilterSavedMovies([]);
    setArrSavedLikes([]);
    setDisplayMovies(0);
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
              filterMovies={filterMovies}
              arrSavedLikes={arrSavedLikes}
              setDisplayMovies={setDisplayMovies}
              displayMovies={displayMovies}
              isDisabledMore={isDisabledMore}
              setArrSavedLikes={setArrSavedLikes}
              requestFilterMovies={requestFilterMovies}
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
              setDisplayMovies={setDisplayMovies}
              displayMovies={displayMovies}
              isDisabledMore={isDisabledMore}
              arrSavedLikes={arrSavedLikes}
              setArrSavedLikes={setArrSavedLikes}
              requestFilterMovies={requestFilterMovies}
              filterSavedMovies={filterSavedMovies}
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