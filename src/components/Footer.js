import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.png';
import mealIcon from '../images/mealIcon.png';
import '../styles/footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <Link
        to="/drinks"
      >
        <img
          className="footer-drinks"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          alt="drink"
        />

      </Link>

      <Link
        to="/meals"
      >
        <img
          className="footer-meals"
          src={ mealIcon }
          data-testid="meals-bottom-btn"
          alt="meals"
        />
      </Link>

    </footer>
  );
}

export default Footer;
