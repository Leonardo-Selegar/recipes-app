import React, { useContext } from 'react';
import context from '../context/Context';
import logout from '../images/logout.png';

export default function BtnLogoutProfile() {
  const { handleLogout } = useContext(context);
  return (
    <div className="logout-recipes">
      <button
        className="buttons"
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        <img
          src={ logout }
          alt="logout"
          width="25px"
        />
      </button>
      <h3 className="text">Logout</h3>
    </div>
  );
}
