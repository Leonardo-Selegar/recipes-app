/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useHistory } from 'react-router-dom';
import context from '../context/Context';
import '../styles/DrinksDetails.css';
import BtnFavDrinks from '../components/BtnFavDrinks';
import BtnShare from '../components/BtnShare';

function DrinksInProgress() {
  const { data, setData, ingredients,
    setIngredients, measure, setMeasure } = useContext(context);
  const [id, setId] = useState('');
  const [drinks, setDrinks] = useState({});
  const { pathname } = window.location;
  const [mealsArray, setMealsArray] = useState([]);
  const history = useHistory();

  const fetchDrinks = async (str) => {
    const request = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${str}`,
    );
    const response = await request.json();
    setData(...response.drinks);
    const info = response.drinks[0];
    setDrinks(info);
    const filtringElements = Object.entries(info)
      .filter((e) => e[0].includes('strIngredient'));
    const filteredIngredients = filtringElements
      .map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);
    setIngredients(filteredIngredients);

    const measureList = Object.entries(info).filter((e) => e[0].includes('strMeasure'));
    const filteredMesure = measureList
      .map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);
    setMeasure(filteredMesure);
  };

  const drinksInProgress = () => {
    const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = data;
    const objDrinks = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    let arrayLocal = [];
    const path = '/done-recipes';

    if (localStorage.getItem('doneRecipes')) {
      arrayLocal = JSON.parse(localStorage.getItem('doneRecipes'));
      if (arrayLocal.find((element) => element.id === objDrinks.id)) {
        localStorage.setItem('doneRecipes', JSON.stringify(arrayLocal));
        history.push(path);
        return;
      }
      arrayLocal.push(objDrinks);
      localStorage.setItem('doneRecipes', JSON.stringify(arrayLocal));
      history.push(path);
      return;
    }
    arrayLocal.push(objDrinks);
    localStorage.setItem('doneRecipes', JSON.stringify(arrayLocal));
    history.push(path);
  };

  const requestAPI = async () => {
    const numeroDeComidas = 6;
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endPoint);
    const { meals } = await response.json();
    const newMeals = meals.slice(0, numeroDeComidas);
    setMealsArray(newMeals);
  };

  useEffect(() => {
    const splitStr = pathname.split('/');
    const str = splitStr[2].replace(/:/g, '');
    setId(str);
    fetchDrinks(str);
    requestAPI();
  }, []);

  return (
    <div>
      <div className="card-details">
        <Card style={ { width: '26rem' } }>
          <Card.Img
            variant="top"
            src={ data.strDrinkThumb }
            alt={ data.strDrink }
            data-testid="recipe-photo"
          />
          <Card.Body>
            <div className="btns-container">
              <Card.Title data-testid="recipe-title">{data.strDrink}</Card.Title>
              <BtnFavDrinks drinks={ drinks } id={ id } />
              <BtnShare id={ id } type="drinks" />
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
                    key={ item }
                    data-testid={ `${index}-ingredient-name-and-measure` }
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
      <div className="container">
        <div className="carousel-container">
          {mealsArray.map((meal, index) => (
            <Link
              to={ `/meals/${meal.idMeal}` }
              key={ index }
            >
              <Card
                style={ { width: '13rem' } }
                data-testid={ `${index}-recommendation-card` }
              >
                <Card.Img
                  className="d-block w-100"
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  width="300px"
                />
                <Card.Title>
                  <h1
                    data-testid={ `${index}-recommendation-title` }
                    className="card-title"
                  >
                    {meal.strMeal}
                  </h1>
                </Card.Title>
              </Card>
            </Link>
          ))}
          ;
        </div>
      </div>
      <div className="btn-recipe-container">

        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="recipe-btn"
          onClick={ drinksInProgress }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

export default DrinksInProgress;
