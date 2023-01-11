import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/perfil.png';
import searchIcon from '../images/search.png';
import SearchBar from './SearchBar';
import '../styles/header.css';

function Header({ showSearch = true, profileImage = true, pageName, type }) {
  const history = useHistory();

  const [showInput, setShowinput] = useState(false);

  const handleProfile = () => {
    history.push('/profile');
  };

  const handleSearch = () => {
    setShowinput((prev) => !prev);
  };

  return (
    <div>
      <div className="header">
        <div className="title-header">
          <h1>RECIPES</h1>
          <h2>app</h2>
        </div>
        <div className="buttons-header">
          {((showSearch) && (
            <button
              className="serach-btn "
              type="button"
              onClick={ handleSearch }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="searchIcon"
                width="45px"
              />
            </button>
          ))}
          { ((profileImage) && (
            <button
              className="perfil-btn"
              type="button"
              onClick={ handleProfile }
            >
              <img
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="profileIcon"
                width="55px"
              />
            </button>

          ))}
        </div>
      </div>
      { ((pageName) && (
        <h1 data-testid="page-title" className="page-title">
          { pageName }
        </h1>
      ))}
      {
        (showInput)
        && (<SearchBar type={ type } />)
      }
    </div>
  );
}

Header.propTypes = {
  pageName: PropTypes.string,
  showSearch: PropTypes.bool,
  profileImage: PropTypes.bool,
}.isRequired;

export default Header;
