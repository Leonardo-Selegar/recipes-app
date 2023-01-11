import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidation, setValidation] = useState(true);

  function disableValidation() {
    const NUMBER_MIN = 6;
    const regex = /\S+@\S+\.\S+/;
    const validacion = regex.test(email);
    const condicion = password.length >= NUMBER_MIN;

    const validation = (
      !validacion
      || !condicion
    );
    setValidation(validation);
  }

  function handleEmail({ target: { value } }) {
    setEmail(value);
    disableValidation();
  }

  function handlePassword({ target: { value } }) {
    setPassword(value);
    disableValidation();
  }

  const handleSubmit = () => localStorage.setItem('user', JSON.stringify({ email }));

  return (
    <div className="login-page">
      <h1 className="title-login">Recipes App</h1>
      <form className="center form">
        <h3 className="login-title">LOGIN</h3>
        <input
          className="input"
          placeholder="Email"
          type="text"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ handleEmail }
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ handlePassword }
        />
        <Link to="/meals">
          <button
            className="btn-login"
            type="button"
            data-testid="login-submit-btn"
            disabled={ isValidation }
            onClick={ handleSubmit }
          >
            Enter
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
