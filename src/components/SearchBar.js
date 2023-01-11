import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/header.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import context from '../context/Context';

function SearchBar({ type }) {
  const { handleCategory,
    searchBtnDrinks, searchBtnMeals, handleTerm } = useContext(context);
  return (
    <section className="search-bar">
      <div className="seachr-bar-content">
        <div className="search-bar-inputs">
          <label htmlFor="ingredient" className="label-header">
            Ingredient
            <input
              type="radio"
              id="ingredient"
              data-testid="ingredient-search-radio"
              name="searchCategory"
              value="ingredient"
              onChange={ ({ target: { value } }) => handleCategory(value) }
            />
          </label>
          <label htmlFor="name" className="label-header">
            Name
            <input
              type="radio"
              id="name"
              data-testid="name-search-radio"
              name="searchCategory"
              value="name"
              onChange={ ({ target: { value } }) => handleCategory(value) }
            />
          </label>
          <label htmlFor="first-letter" className="label-header">
            First Letter
            <input
              className="radio-header"
              type="radio"
              id="first-letter"
              data-testid="first-letter-search-radio"
              name="searchCategory"
              value="firstLetter"
              onChange={ ({ target: { value } }) => handleCategory(value) }
            />
          </label>
        </div>

        <InputGroup className="mb-3 input-header">
          <Form.Control
            className="search-text-input"
            placeholder="Search"
            data-testid="search-input"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={ ({ target: { value } }) => handleTerm(value) }
          />
          {
            type === 'drinks' ? (
              <Button
                className="search-btn"
                type="button"
                data-testid="exec-search-btn"
                onClick={ searchBtnDrinks }
                variant="outline-secondary"
                id="button-addon2"
              >
                Search
              </Button>
            ) : (
              <Button
                className="search-btn"
                type="button"
                data-testid="exec-search-btn"
                onClick={ searchBtnMeals }
                variant="outline-secondary"
                id="button-addon2"
              >
                Search
              </Button>
            )
          }
        </InputGroup>
      </div>
    </section>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default SearchBar;
