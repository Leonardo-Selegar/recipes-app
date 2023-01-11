import React, { useContext } from 'react';
import context from '../context/Context';
import '../styles/profile.css';
import verificado from '../images/verificado-amarela.png';

export default function BtnDoneRecipes() {
  const { handleDoneRecipes } = useContext(context);
  return (
    <div className="done-recipes">
      <button
        className="buttons"
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleDoneRecipes }
      >
        <img
          src={ verificado }
          alt="doneRecipe"
          width="30px"
        />
      </button>
      <h3 className="text">Done Recipes</h3>
    </div>
  );
}
