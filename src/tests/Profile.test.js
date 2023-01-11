import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';

const localStorage = (id, local) => {
  window.localStorage.setItem(id, JSON.stringify(local));
};

localStorage('user', { email: 'teste2@gmail.com' });

describe('testando página Profile', () => {
  test('Testando se email e botões são renderizados', () => {
    renderWithRouterAndContext(<App />, '/profile');

    const email = screen.getByTestId(/profile-email/i);
    const doneRecipes = screen.getByTestId(/profile-done-btn/i);
    const FavRecipes = screen.getByTestId(/profile-favorite-btn/i);
    const logoutBtn = screen.getByTestId(/profile-logout-btn/i);

    expect(email).toBeInTheDocument();
    expect(doneRecipes).toBeInTheDocument();
    expect(FavRecipes).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  test('Testando se o botão Favorite Recipes encaminha para a pagina correta.', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');

    const FavRecipes = screen.getByTestId(/profile-favorite-btn/i);

    userEvent.click(FavRecipes);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Testando se o botão Done Recipes encaminha para a pagina correta. ', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');

    const doneRecipes = screen.getByTestId(/profile-done-btn/i);
    userEvent.click(doneRecipes);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Testando se o botão logout encaminha para login.', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');

    const logoutBtn = screen.getByTestId(/profile-logout-btn/i);
    userEvent.click(logoutBtn);

    expect(history.location.pathname).toBe('/');
  });
});
