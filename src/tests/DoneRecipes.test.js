import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import Provider from '../context/Provider';
import localStorageMock from './localStorageMock';

const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock(),
  });
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: () => {},
    },
  });
});

describe('Testa a pagina DoneRecipes', () => {
  test('Testa se renderiza as receitas a partir do localStorage', async () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    renderWithRouter(<Provider><DoneRecipes /></Provider>);
    const mealImg = screen.getByTestId('0-horizontal-image');
    const drinkImg = screen.getByTestId('1-horizontal-image');
    expect(mealImg).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
    userEvent.click(screen.getByTestId('1-horizontal-image'));
  });
  test('Testa se as telas aparecem com os elementos corretos de meals e drinks', async () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    renderWithRouter(<Provider><DoneRecipes /></Provider>);
    const mealImg = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const drinkImg = screen.getByRole('img', {
      name: /aquamarine/i,
    });
    expect(mealImg).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    const allBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(mealBtn);
    expect(mealImg).toBeInTheDocument();
    expect(drinkImg).not.toBeInTheDocument();
    userEvent.click(drinkBtn);
    userEvent.click(allBtn);
    userEvent.click(screen.getByTestId('0-horizontal-image'));
  });
});
