import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Verificando comportamento/elementos da página MealsDetails', () => {
  jest.setTimeout(10000);
  it('Quando clicado carrega as informações corretas da receita selecioanada: ', async () => {
    let { history: { location: { pathname } } } = renderWithRouterAndContext(<App />, '/meals');
    pathname = '/meals/52977';

    const recipeCorba = await screen.findByRole('heading', { name: /corba/i });
    expect(recipeCorba).toBeInTheDocument();
    userEvent.click(recipeCorba);
    expect(pathname).toBe('/meals/52977');

    const firstIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(firstIngredient).toBeInTheDocument();

    const firstRecomendation = await screen.findByTestId('0-recommendation-card');
    expect(firstRecomendation).toBeInTheDocument();
  });
});
