/* eslint-disable react/jsx-max-depth */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import BtnFavDrinks from '../components/BtnFavDrinks';
import BtnShare from '../components/BtnShare';
import Header from '../components/Header';
import context from '../context/Context';
import '../styles/DrinksDetails.css';

export default function DrinksDetails() {
  const { data,
    setData, ingredients, setIngredients, measure, setMeasure } = useContext(context);
  const [id, setId] = useState('');
  const [drinks, setDrinks] = useState({});
  const { pathname } = window.location;
  const [mealsArray, setMealsArray] = useState([]);
  // const [doneRecipesList] = useState(JSON.parse(localStorage.getItem('doneRecipes')));

  const fetchDrinks = async (str) => {
    const request = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${str}`,
    );
    const response = await request.json();
    setData(...response.drinks);
    const info = response.drinks[0];
    setDrinks(info);
    const filtringElements = Object
      .entries(info).filter((e) => e[0].includes('strIngredient'));
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
      <Header showSearch={ false } pageName="Drinks Details" />
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
                    {`${item} - ${measure[index]}`}
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
              <p
                data-testid="instructions"
              >
                {data.strInstructions}
              </p>
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
        <Link to={ `/drinks/${id}/in-progress` }>
          <button
            className="recipe-btn"
            type="button"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        </Link>
      </div>
    </div>
  );
}
