import React, { useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import context from '../context/Context';

function Meals() {
  const [mealsArray, setMealsArray] = useState([]);
  const [categorysArray, setCategorysArray] = useState([]);
  const [verifyClick, setVerifyClick] = useState(false);
  const { recipeList } = useContext(context);
  const [loadingMeals, setLoadingMeals] = useState(true);
  const [loadingCategorys, setLoadingCategorys] = useState(true);

  const requestAPI = async () => {
    setLoadingMeals(true);
    const numeroDeComidas = 12;
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endPoint);
    const { meals } = await response.json();
    const newMeals = meals.slice(0, numeroDeComidas);
    setMealsArray(newMeals);
    setVerifyClick(false);
    setLoadingMeals(false);
  };

  useEffect(() => {
    requestAPI();
    const requestApiCategory = async () => {
      const numeroDeCategorias = 5;
      const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      const cetegorys = meals.slice(0, numeroDeCategorias);
      setCategorysArray(cetegorys);
      setLoadingCategorys(false);
    };
    requestApiCategory();
  }, []);

  useEffect(() => {
    if (recipeList !== undefined && recipeList !== null) {
      setMealsArray(recipeList);
    } else {
      requestAPI();
    }
  }, [recipeList]);

  function handleClick({ target }) {
    setLoadingMeals(true);
    if (target.name !== '' && verifyClick === false) {
      const requestAPI5meals = async () => {
        const numeroDeComidas = 12;
        const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.name}`;
        const response = await fetch(endPoint);
        const { meals } = await response.json();
        const fiveMeals = meals.slice(0, numeroDeComidas);
        setMealsArray(fiveMeals);
        setVerifyClick(true);
        setLoadingMeals(false);
      };
      return requestAPI5meals();
    }
    requestAPI();
  }

  return (
    <>
      {
        loadingCategorys ? <Loading /> : (

          <div className="buttons-categorys">
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ handleClick }
              className="button"
            >
              All
            </button>
            {categorysArray.map((category, index) => (
              <button
                className="button btn-text"
                key={ index }
                type="button"
                index={ index }
                value={ verifyClick }
                name={ category.strCategory }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ handleClick }
              >
                {category.strCategory}
              </button>
            ))}
          </div>
        )
      }
      <div>
        {
          recipeList === null && (
            global.alert('Sorry, we haven\'t found any recipes for these filters.')
          )
        }
        {
          loadingMeals ? <Loading /> : (
            <ul className="cards-drinks">
              {mealsArray.map((meal, index) => (
                <Link
                  to={ `/meals/${meal.idMeal}` }
                  key={ `${meal.idMeal}-${index}` }
                  data-testid={ `${index}-recipe-card` }
                >
                  <Card className="card-drinks" style={ { width: '17rem' } }>
                    <Card.Img
                      variant="top"
                      data-testid={ `${index}-card-img` }
                      src={ meal.strMealThumb }
                      alt={ meal.strMeal }
                      width="40%"
                    />
                    <Card.Body>
                      <Card.Title
                        className="card-title"
                        data-testid={ `${index}-card-name` }
                      >
                        {meal.strMeal}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              ))}
            </ul>
          )
        }
      </div>
      <Footer />
    </>

  );
}
export default Meals;
