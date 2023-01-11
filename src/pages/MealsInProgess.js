/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useHistory } from 'react-router-dom';
import context from '../context/Context';
import '../styles/DrinksDetails.css';
import BtnFavMeals from '../components/BtnFavMeals';
import BtnShare from '../components/BtnShare';

function MealsInProgress() {
  const { data, setData, ingredients,
    setIngredients, measure, setMeasure } = useContext(context);
  const [id, setId] = useState('');
  const [meals, setMeals] = useState({});
  const [youtube, setYoutube] = useState('');
  const { pathname } = window.location;
  const [drinksArray, setDrinksArray] = useState([]);
  const history = useHistory();

  const fetchMeals = async (str) => {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${str}`);
    const response = await request.json();
    setData(...response.meals);
    const info = response.meals[0];
    setMeals(info);
    const ytVideo = info.strYoutube.split('=');
    setYoutube(ytVideo[1]);

    const filtringElements = Object.entries(info)
      .filter((e) => e[0].includes('strIngredient'));
    const filteredIngredients = filtringElements.map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);
    setIngredients(filteredIngredients);

    const measureList = Object.entries(info).filter((e) => e[0].includes('strMeasure'));
    const filteredMesure = measureList.map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);
    setMeasure(filteredMesure);
  };

  const mealsInProgress = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = data;
    const objMeals = {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };

    let arrayLocal = [];
    const path = '/done-recipes';

    if (localStorage.getItem('doneRecipes')) {
      arrayLocal = JSON.parse(localStorage.getItem('doneRecipes'));
      if (arrayLocal.find((element) => element.id === objMeals.id)) {
        localStorage.setItem('doneRecipes', JSON.stringify(arrayLocal));
        history.push(path);
        return;
      }
      arrayLocal.push(objMeals);
      localStorage.setItem('doneRecipes', JSON.stringify(arrayLocal));
      history.push(path);
      return;
    }
    arrayLocal.push(objMeals);
    localStorage.setItem('doneRecipes', JSON.stringify(arrayLocal));
    history.push(path);
  };

  const requestAPI = async () => {
    const numeroDeBebidas = 6;
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endPoint);
    const { drinks } = await response.json();
    const newDrinks = drinks.slice(0, numeroDeBebidas);
    setDrinksArray(newDrinks);
  };

  useEffect(() => {
    const splitStr = pathname.split('/');
    const str = splitStr[2].replace(/:/g, '');
    setId(str);
    fetchMeals(str);
    requestAPI();
  }, []);

  return (
    <div>
      <div className="card-details">
        <Card style={ { width: '26rem' } }>
          <Card.Img
            variant="top"
            src={ data.strMealThumb }
            alt={ data.strMeal }
            data-testid="recipe-photo"
          />
          <Card.Body>
            <div className="btns-container">
              <Card.Title data-testid="recipe-title">{data.strMeal}</Card.Title>
              <BtnFavMeals id={ id } meals={ meals } />
              <BtnShare id={ id } type="meals" />
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="ingredients">
        <div>
          <h3 className="center-text">Ingredients:</h3>
          <Card style={ { width: '26rem' } }>
            <Card.Body>
              <ul>
                {ingredients.map((item, index) => (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    <label
                      htmlFor={ `ingredient-${index + 1}` }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                      />
                      {`${item} - ${measure[index]}`}
                    </label>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="ingredients">
        <div>
          <h3 className="center-text">Instructions:</h3>
          <Card style={ { width: '26rem' } }>
            <Card.Body>
              <p data-testid="instructions">{data.strInstructions}</p>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="ingredients">
        <div>
          <h3 className="center-text">Video:</h3>
          <Card style={ { width: '26rem' } }>
            <Card.Body>
              <iframe
                data-testid="video"
                src={ `https://www.youtube.com/embed/${youtube}` }
                title="youtube"
              />
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="recomended-container-text">
        <div className="recommended">
          <h3 className="center-text">Recommended:</h3>
        </div>
      </div>
      <div className="container">
        <div className="carousel-container">
          {drinksArray.map((drinks, index) => (
            <Link
              to={ `/drinks/${drinks.idDrink}` }
              key={ index }
            >
              <Card
                style={ { width: '13rem' } }
                data-testid={ `${index}-recommendation-card` }
              >
                <Card.Img
                  className="d-block w-100"
                  src={ drinks.strDrinkThumb }
                  alt={ drinks.strDrink }
                  width="300px"
                />
                <Card.Title>
                  <h1
                    data-testid={ `${index}-recommendation-title` }
                    className="card-title"
                  >
                    {drinks.strDrink}
                  </h1>
                </Card.Title>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className="btn-recipe-container">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="recipe-btn"
          onClick={ mealsInProgress }
        >
          Finish Recipe
        </button>

      </div>
    </div>
  );
}

export default MealsInProgress;
