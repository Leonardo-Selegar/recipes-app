import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import { requestAPIDrinks } from '../services/APIs';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Verificando listas de receitas da API de bebidas', () => {
  jest.setTimeout(15000);
  it('Lista de receitas correta, quando pesquisado por ingrediente: ', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'lemon');

    const radioIngredient = screen.getByText(/ingredient/i);
    expect(radioIngredient).toBeInTheDocument();
    userEvent.click(radioIngredient);

    const searchBtnDrinks = screen.getByText(/search/i);
    expect(searchBtnDrinks).toBeInTheDocument();
    userEvent.click(searchBtnDrinks);

    await act(async () => {
      const listDrinks = await requestAPIDrinks('lemon', null, null);
      expect(listDrinks.length).toBe(32);
    });
  });

  it('Lista de receitas correta, quando pesquisado por nome: ', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'martini');

    const radioName = screen.getByText(/name/i);
    expect(radioName).toBeInTheDocument();
    userEvent.click(radioName);

    const searchBtnDrinks = screen.getByText(/search/i);
    expect(searchBtnDrinks).toBeInTheDocument();
    userEvent.click(searchBtnDrinks);

    await act(async () => {
      const listDrinks = await requestAPIDrinks(null, 'martini', null);
      expect(listDrinks.length).toBe(14);
    });
  });

  it('Lista de receitas correta, quando pesquisado por pimeira letra', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'm');

    const radioFirstLetter = screen.getByText(/first letter/i);
    expect(radioFirstLetter).toBeInTheDocument();
    userEvent.click(radioFirstLetter);

    const searchBtnDrinks = screen.getByText(/search/i);
    expect(searchBtnDrinks).toBeInTheDocument();
    userEvent.click(searchBtnDrinks);

    await act(async () => {
      const listDrinks = await requestAPIDrinks(null, null, 'm');
      expect(listDrinks.length).toBe(25);
    });
  });

  it('Exibe um global alert, caso a pesquisa por primeira letra tenha sido feita de forma incorreta', async () => {
    global.alert = jest.fn();

    renderWithRouterAndContext(<App />, '/drinks');

    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'martini');

    const radioFirstLetter = screen.getByText(/first letter/i);
    expect(radioFirstLetter).toBeInTheDocument();
    userEvent.click(radioFirstLetter);

    const searchBtnDrinks = screen.getByText(/search/i);
    expect(searchBtnDrinks).toBeInTheDocument();
    userEvent.click(searchBtnDrinks);

    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});
