import React, { useContext } from 'react';
import context from '../context/Context';
import FavRecipes from '../images/Coração-Amarelo.png';

export default function BtnFavProfile() {
  const { handleFavRecipes } = useContext(context);
  return (
    <div className="favorite-recipes">
      <button
        className="buttons"
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleFavRecipes }
      >
        <img
          src={ FavRecipes }
          alt="drink"
          width="30px"
        />
      </button>
      <h3 className="text">Favorite Recipes</h3>
    </div>
  );
}
