import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import drinkCategories from './mocks/drinkCategories';
import ordinaryDrinks from './mocks/ordinaryDrinks';
import App from '../App';

describe('Verificando comportamentos da página de Drinks', () => {
  test('Verificando se retorna as receitas corretas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });

    renderWithRouterAndContext(<App />, '/drinks');

    const ordinaryBtn = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(ordinaryBtn).toBeInTheDocument();

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(ordinaryDrinks),
    });

    userEvent.click(ordinaryBtn);

    const nightDrink = await screen.findByRole('heading', { name: /a night in old mandalay/i });
    expect(nightDrink).toBeInTheDocument();
  });
});
