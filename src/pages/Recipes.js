import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Meals from './Meals';
import Header from '../components/Header';
import context from '../context/Context';

function Recipes() {
  const { recipeList } = useContext(context);
  return (
    <div>
      { recipeList !== undefined && recipeList !== null && (
        recipeList.length === 1 && <Redirect to={ `/meals/${recipeList[0].idMeal}` } />
      )}
      <Header pageName="Meals" type="meals" />
      <Meals />
    </div>
  );
}

export default Recipes;
