import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Verificando comportamento/elementos da página DrinksDetails', () => {
  it('Quando clicado carrega as informações corretas da receita selecioanada: ', async () => {
    let { history: { location: { pathname } } } = renderWithRouterAndContext(<App />, '/drinks');
    pathname = '/drinks/15997';

    const ggDrink = await screen.findByRole('heading', { name: /gg/i });
    expect(ggDrink).toBeInTheDocument();
    userEvent.click(ggDrink);
    expect(pathname).toBe('/drinks/15997');

    const firstIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(firstIngredient).toBeInTheDocument();

    const firstRecomendation = await screen.findByTestId('0-recommendation-card');
    expect(firstRecomendation).toBeInTheDocument();
  });
});
