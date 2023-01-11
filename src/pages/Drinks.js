import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import context from '../context/Context';
import '../styles/drinksAndMeals.css';

function Drinks() {
  const [drinksArray, setDrinksArray] = useState([]);
  const [categorysArray, setCategorysArray] = useState([]);
  const [verifyClick, setVerifyClick] = useState(false);
  const { recipeList } = useContext(context);
  const [loadingDrinks, setLoadingDrinks] = useState(true);
  const [loadingCategorys, setLoadingCategorys] = useState(true);

  const requestAPI = async () => {
    setLoadingDrinks(true);
    const numeroDeBebidas = 12;
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endPoint);
    const { drinks } = await response.json();
    const newDrinks = drinks.slice(0, numeroDeBebidas);
    setDrinksArray(newDrinks);
    setVerifyClick(false);
    setLoadingDrinks(false);
  };

  useEffect(() => {
    requestAPI();
    const requestApiCategory = async () => {
      const numeroDeCategorias = 5;
      const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      const cetegorys = drinks.slice(0, numeroDeCategorias);
      setCategorysArray(cetegorys);
      setLoadingCategorys(false);
    };
    requestApiCategory();
  }, []);

  useEffect(() => {
    if (recipeList !== undefined && recipeList !== null) {
      setDrinksArray(recipeList);
    } else {
      requestAPI();
    }
  }, [recipeList]);

  function handleClick({ target }) {
    setLoadingDrinks(true);
    if (target.name !== '' && verifyClick === false) {
      const requestAPI5bebidas = async () => {
        const numeroDeBebidas = 12;
        const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.name}`;
        const response = await fetch(endPoint);
        const { drinks } = await response.json();
        const fiveDrinks = drinks.slice(0, numeroDeBebidas);
        setDrinksArray(fiveDrinks);
        setVerifyClick(true);
        setLoadingDrinks(false);
      };
      return requestAPI5bebidas();
    }
    requestAPI();
  }

  return (
    <>
      <Header showSearch profileImage pageName="Drinks" type="drinks" />
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
                value={ verifyClick }
                data-testid={ `${category.strCategory}-category-filter` }
                name={ category.strCategory }
                onClick={ handleClick }
              >
                {category.strCategory}
              </button>
            ))}
          </div>
        )
      }
      {loadingDrinks ? <Loading /> : (

        <div>
          <ul className="cards-drinks">
            {drinksArray.map((drink, index) => (
              <Link
                to={ `/drinks/${drink.idDrink}` }
                key={ `${drink.idDrink}-${index}` }
                data-testid={ `${index}-recipe-card` }
              >
                <Card className="card-drinks" style={ { width: '17rem' } }>
                  <Card.Img
                    variant="top"
                    data-testid={ `${index}-card-img` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                    width="50%"
                  />
                  <Card.Body>
                    <Card.Title
                      className="card-title"
                      data-testid={ `${index}-card-name` }
                    >
                      {drink.strDrink}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </>
  );
}
export default Drinks;
