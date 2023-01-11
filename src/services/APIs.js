export const requestAPIMeals = async (ingredient, name, firstLetter) => {
  const numeroDeComidas = 12;
  if (ingredient !== null) {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const { meals } = await request.json();
    const newMeals = meals.slice(0, numeroDeComidas);
    return newMeals;
  }
  if (name !== null) {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const { meals } = await request.json();
    const newMeals = meals.slice(0, numeroDeComidas);
    return newMeals;
  }
  if (firstLetter !== null) {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const { meals } = await request.json();
    const newMeals = meals.slice(0, numeroDeComidas);
    return newMeals;
  }
};

export const requestAPIDrinks = async (ingredient, name, firstLetter) => {
  const numeroDeBebidas = 12;
  if (ingredient !== null) {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const { drinks } = await request.json();
    const newDrinks = drinks.slice(0, numeroDeBebidas);
    return newDrinks;
  }
  if (name !== null) {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const { drinks } = await request.json();
    const newDrinks = drinks.slice(0, numeroDeBebidas);
    return newDrinks;
  }
  if (firstLetter !== null) {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const { drinks } = await request.json();
    const newDrinks = drinks.slice(0, numeroDeBebidas);
    return newDrinks;
  }
};
