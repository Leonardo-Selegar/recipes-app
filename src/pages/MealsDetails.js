import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BtnFavMeals from '../components/BtnFavMeals';
import BtnShare from '../components/BtnShare';
import context from '../context/Context';
import '../styles/DrinksDetails.css';

function MealsDetails() {
  const { data, setData, ingredients, setIngredients,
    measure, setMeasure } = useContext(context);

  const [drinksArray, setDrinksArray] = useState([]);
  const [id, setId] = useState('');
  const { pathname } = window.location;
  const [meals, setMeals] = useState({});

  const [youtube, setYoutube] = useState('');

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

  const requestAPI = async () => {
    const numeroDeBebidas = 6;
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endPoint);
    const { drinks } = await response.json();
    const newDrinks = drinks.slice(0, numeroDeBebidas);
    setDrinksArray(newDrinks);
    console.log(newDrinks);
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
      <Header showSearch={ false } pageName="Meals Details" />
      <div className="card-details">
        <Card style={ { width: '26rem' } }>
          <Card.Img
            variant="top"
            src={ data.strMealThumb }
            alt={ data.strMeal }
            data-testid="recipe-photo"
          />
          <div className="btns-container">
            <Card.Title data-testid="recipe-title">{data.strMeal}</Card.Title>
            <BtnFavMeals id={ id } meals={ meals } />
            <BtnShare id={ id } type="meals" />
          </div>
        </Card>
      </div>
      <div className="ingredients">
        <h3 className="center-text">Ingredients:</h3>
        <Card style={ { width: '26rem' } }>
          <ul>
            {ingredients.map((item, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item} - ${measure[index]}`}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="ingredients">
        <h3 className="center-text">Instructions:</h3>
        <Card style={ { width: '26rem' } }>
          <Card.Body>
            <p data-testid="instructions">{data.strInstructions}</p>
          </Card.Body>
        </Card>
      </div>
      <div className="ingredients">
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
      <div className="container">
        <h3 className="center-text">Recommended:</h3>
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
        <Link to={ `/meals/${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="recipe-btn"
          >
            Start Recipe
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MealsDetails;
