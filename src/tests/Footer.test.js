import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';

describe('testando Footer component', () => {
  test('Testando se os icones sao renderizados', () => {
    renderWithRouterAndContext(<App />, '/profile');

    const footer = screen.getByTestId(/footer/i);
    const mealIcon = screen.getByTestId(/meals-bottom-btn/i);
    const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);

    expect(footer).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
  });

  test('Testando se os icones encaminham para pagina de drink', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');

    const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);

    userEvent.click(drinkIcon);

    expect(history.location.pathname).toBe('/drinks');
  });

  test('Testando se os icones encaminham para pagina de drink', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');

    const mealIcon = screen.getByTestId(/meals-bottom-btn/i);
    userEvent.click(mealIcon);

    expect(history.location.pathname).toBe('/meals');
  });
});
