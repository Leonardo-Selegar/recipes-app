/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import blackHeartIcon from '../images/Coração-Amarelo.png';
import BtnShare from '../components/BtnShare';
import '../styles/drinksAndMeals.css';

function FavoriteRecipes() {
  const [favCard, setFavcard] = useState([]);
  const [favList, setFavList] = useState([]);

  const filterItems = ({ target }) => {
    const { name } = target;
    if (target.name === 'all') {
      setFavcard(JSON.parse(localStorage.getItem('favoriteRecipes')));
    } else {
      setFavcard(favList.filter((element) => element.type === name));
    }
  };

  const handleFav = (id) => {
    const result = favCard.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(result));
    setFavList(result);
  };

  useEffect(() => {
    setFavcard(favList);
  }, [favList]);

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavList(results);
  }, []);

  const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return (
    <div>
      <Header pageName="Favorite Recipes" showSearch={ false } />
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
            {favCard.map((card, index) => (
              <ul key={ card.id }>
                <Card className="card-drinks" style={ { width: '17rem' } }>
                  <Link to={ `${card.type}s/${card.id}` }>
                    <Card.Img
                      variant="top"
                      width="50%"
                      src={ card.image }
                      alt={ card.name }
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {card.name}
                    </Card.Title>
                    {card.type === 'drink' ? (
                      <Card.Text
                        data-testid={ `${index}-horizontal-top-text` }
                        className="card-text"
                      >
                        {card.alcoholicOrNot}
                        <div className="bnts-card-fav">
                          <BtnShare id={ card.id } type="drinks" />
                          <button
                            type="button"
                            data-testid={ `${index}-horizontal-favorite-btn` }
                            onClick={ () => handleFav(card.id) }
                            className="btn-fav"
                          >
                            <img
                              src={ blackHeartIcon }
                              width="30px"
                              alt="botaoFavoritado"
                            />
                          </button>
                        </div>
                      </Card.Text>
                    ) : (
                      <Card.Text
                        data-testid={ `${index}-horizontal-top-text` }
                        className="card-text"
                      >
                        {`${card.nationality} - ${card.category}`}
                        <div className="bnts-card-fav">
                          <BtnShare id={ card.id } type="meals" />
                          <button
                            type="button"
                            data-testid={ `${index}-horizontal-favorite-btn` }
                            onClick={ () => handleFav(card.id) }
                            className="btn-fav"
                          >
                            <img
                              src={ blackHeartIcon }
                              width="30px"
                              alt="botaoFavoritado"
                            />
                          </button>
                        </div>
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </ul>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
