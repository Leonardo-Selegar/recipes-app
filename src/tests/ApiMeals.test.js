import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import { requestAPIMeals } from '../services/APIs';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Verificando listas de receitas da API de comidas', () => {
  jest.setTimeout(10000);
  it('Lista de receitas correta, quando pesquisado por nome: ', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'chicken');

    const radioName = screen.getByText(/name/i);
    expect(radioName).toBeInTheDocument();
    userEvent.click(radioName);

    const searchBtnMeals = screen.getByText(/search/i);
    expect(searchBtnMeals).toBeInTheDocument();
    userEvent.click(searchBtnMeals);

    await act(async () => {
      const listMeals = await requestAPIMeals(null, 'chicken', null);
      expect(listMeals.length).toBe(25);
    });
  });

  it('Lista de receitas correta, quando pesquisado por ingrediente: ', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'chicken');

    const radioIngredient = screen.getByText(/ingredient/i);
    expect(radioIngredient).toBeInTheDocument();
    userEvent.click(radioIngredient);

    const searchBtnMeals = screen.getByText(/search/i);
    expect(searchBtnMeals).toBeInTheDocument();
    userEvent.click(searchBtnMeals);

    await act(async () => {
      const listMeals = await requestAPIMeals('chicken', null, null);
      expect(listMeals.length).toBe(11);
    });
  });

  it('Lista de receitas correta, quando pesquisado por primeira letra: ', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'c');

    const radioFirstLetter = screen.getByText(/first letter/i);
    expect(radioFirstLetter).toBeInTheDocument();
    userEvent.click(radioFirstLetter);

    const searchBtnMeals = screen.getByText(/search/i);
    expect(searchBtnMeals).toBeInTheDocument();
    userEvent.click(searchBtnMeals);

    await act(async () => {
      const listMeals = await requestAPIMeals(null, null, 'c');
      expect(listMeals.length).toBe(47);
    });
  });

  it('Exibe um alert, em caso de busca errada por primeira letra: ', async () => {
    global.alert = jest.fn();

    renderWithRouterAndContext(<App />, '/meals');

    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'chicken');

    const radioFirstLetter = screen.getByText(/first letter/i);
    expect(radioFirstLetter).toBeInTheDocument();
    userEvent.click(radioFirstLetter);

    const searchBtnMeals = screen.getByText(/search/i);
    expect(searchBtnMeals).toBeInTheDocument();
    userEvent.click(searchBtnMeals);
  });
});
