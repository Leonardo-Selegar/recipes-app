import React, { useState, useEffect } from 'react';
import '../styles/DrinksDetails.css';
import blackHeartIcon from '../images/Coração-Amarelo.png';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/btnShare.css';

function BtnFavDrinks(drink) {
  const [iconFav, setIconFav] = useState();
  const { id } = drink;
  const favStatus = () => {
    const recipesFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipesFavorites) {
      if (recipesFavorites.some((element) => element.id === id)) {
        setIconFav(true);
      } else {
        setIconFav(false);
      }
    }
  };

  const handleFav = () => {
    const { drinks } = drink;
    const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = drinks;
    const objDrinks = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    console.log(objDrinks);
    let arrayLocal = [];
    if (localStorage.getItem('favoriteRecipes')) {
      arrayLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    arrayLocal.push(objDrinks);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayLocal));

    if (iconFav) {
      const arrayResults = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const result = arrayResults.filter((element) => element.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(result));
    }
    favStatus();
  };

  useEffect(() => {
    favStatus();
  });

  return (
    <div>
      <button
        className="btn-fav"
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFav }
      >
        <img
          src={ iconFav ? (blackHeartIcon) : (whiteHeartIcon) }
          width="30px"
          alt="botãoFavoritar"
        />
      </button>
    </div>

  );
}

export default BtnFavDrinks;
