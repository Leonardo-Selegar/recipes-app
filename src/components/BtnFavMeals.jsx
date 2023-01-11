import React, { useState, useEffect } from 'react';
import '../styles/DrinksDetails.css';
import blackHeartIcon from '../images/Coração-Amarelo.png';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/btnShare.css';

function BtnFavMeals(meal) {
  const [iconFav, setIconFav] = useState();
  const { id } = meal;
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
    const { meals } = meal;
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = meals;
    const objMeals = {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    console.log(objMeals);
    let arrayLocal = [];
    if (localStorage.getItem('favoriteRecipes')) {
      arrayLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    arrayLocal.push(objMeals);
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

export default BtnFavMeals;
