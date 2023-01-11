import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BtnShare from '../components/BtnShare';
import '../styles/DrinksDetails.css';

function DoneRecipes() {
  const [doneCard, setDonecard] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const filterItems = ({ target }) => {
    const { name } = target;
    if (target.name === 'all') {
      setDonecard(JSON.parse(localStorage.getItem('doneRecipes')));
    } else {
      setDonecard(doneList.filter((element) => element.type === name));
    }
  };

  useEffect(() => {
    setDonecard(doneList);
  }, [doneList]);

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneList(results);
  }, []);

  const favRecipe = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <div>
      <Header pageName="Done Recipes" showSearch={ false } />
      {favRecipe && (
        <div>
          <div className="buttons-categorys">
            <button
              className="button"
              type="button"
              data-testid="filter-by-all-btn"
              name="all"
              onClick={ filterItems }
            >
              All
            </button>

            <button
              className="button"
              type="button"
              data-testid="filter-by-meal-btn"
              name="meal"
              onClick={ filterItems }
            >
              Food
            </button>

            <button
              className="button"
              type="button"
              data-testid="filter-by-drink-btn"
              name="drink"
              onClick={ filterItems }
            >
              Drinks
            </button>
          </div>
          <div className="cards-drinks">
            {
              doneCard.map((recipe, index) => (
                <ul key={ recipe.id }>
                  <Card className="card-drinks" style={ { width: '17rem' } }>
                    <Link to={ `${recipe.type}s/${recipe.id}` }>
                      <Card.Img
                        variant="top"
                        width="50%"
                        data-testid={ `${index}-horizontal-image` }
                        src={ recipe.image }
                        alt={ recipe.name }
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title>
                        {recipe.name}
                      </Card.Title>
                      {
                        recipe.type === 'drink' ? (
                          <div className="btn-share-container">
                            <BtnShare id={ recipe.id } type="drinks" />
                          </div>
                        ) : (
                          <div className="btn-share-container">
                            <BtnShare id={ recipe.id } type="meals" />
                          </div>
                        )
                      }
                    </Card.Body>
                  </Card>
                </ul>
              ))
            }
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default DoneRecipes;
