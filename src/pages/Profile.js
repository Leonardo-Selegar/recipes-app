import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BtnDoneRecipes from '../components/BtnDoneRecipes';
import BtnFavProfile from '../components/BtnFavProfile';
import BtnLogoutProfile from '../components/BtnLogoutProfile';

function Profile() {
  const user = localStorage.getItem('user');
  if (!user) localStorage.setItem('user', JSON.stringify({ email: '' }));
  const email = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header pageName="PROFILE" showSearch={ false } />
      <div className="profile">
        <div className="profile-content">
          <p data-testid="profile-email" className="email-profile">
            {Object.values(email)}
          </p>
          <BtnDoneRecipes />
          <hr />
          <BtnFavProfile />
          <hr />
          <BtnLogoutProfile />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
