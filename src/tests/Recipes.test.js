import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';
import mealCategories from './mocks/mealCategories';
import beefMeals from './mocks/beefMeals';

describe('Testes Recipes', () => {
  afterEach(() => jest.clearAllMocks());

  it('Testa se o os botões de filtro são renderizados', () => {
    const { history } = renderWithRouterAndContext(<App />, '/');

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'emailValido@outlook.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    const title = screen.getByTestId('page-title');

    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('Verifica botões de categoria e se renderizam as receitas corretas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });

    renderWithRouterAndContext(<App />, '/meals');

    const beefBtnFilter = await screen.findByRole('button', { name: /beef/i });
    expect(beefBtnFilter).toBeInTheDocument();

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    userEvent.click(beefBtnFilter);

    const beefMustardPie = await screen.findByRole('heading', { name: /beef and mustard pie/i });
    expect(beefMustardPie).toBeInTheDocument();
  });
});
