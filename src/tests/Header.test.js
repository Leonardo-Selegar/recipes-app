import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';

describe('Testando o componente Header', () => {
  test('Testa os se o componente renderiza corretamente', () => {
    renderWithRouterAndContext(<App />, '/');
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const EMAIL_USER = 'testes@testando.com';
    const PASSWORD_USER = '1234567';
    userEvent.type(email, EMAIL_USER);
    userEvent.type(password, PASSWORD_USER);
    const loginButton = screen.getByTestId('login-submit-btn');
    expect(loginButton).toBeInTheDocument();
    userEvent.click(loginButton);
  });
  test('Testando botão de pesquisa', () => {
    renderWithRouterAndContext(<App />, '/meals');
    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
  test('Testa a mudança de pagina', () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
  });

  test('Verificando radio inputs "ingredient", "name", "firstLetter"', () => {
    renderWithRouterAndContext(<App />, '/meals');

    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(searchBtn);

    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');

    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();

    userEvent.click(radioIngredient);
    expect(radioIngredient.value).toBe('ingredient');
    userEvent.click(radioName);
    expect(radioName.value).toBe('name');
    userEvent.click(radioFirstLetter);
    expect(radioFirstLetter.value).toBe('firstLetter');
  });
});
