import React from 'react';

function MoreMovies({
  handleClickMoreLoad,
  isDisabledMore,
  movies
}) {
  return(
    <div className={`more-movies ${isDisabledMore(movies) ? 'more-movies_disabled' : ''}`}>
      <button
        type='button'
        className='more-movies__button'
        name='button_more-movies'
        id='more-movies__button'
        onClick={handleClickMoreLoad}
      >Ещё</button>
    </div>
  );
}

export default MoreMovies;