import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.png';
import '../styles/btnShare.css';

function BtnShare({ id, type }) {
  const [isSaved, setIsSaved] = useState(false);
  const copyClip = () => {
    copy(`http://localhost:3000/${type}/${id}`);
    setIsSaved(true);
  };
  return (
    <div className="share-btn">
      <button
        className="btn-share"
        type="button"
        data-testid="share-btn"
        onClick={ copyClip }
      >
        <img src={ shareIcon } width="30px" alt="shareIcon" />
      </button>
      {isSaved && (
        <p className="share-text">
          Link copied!
        </p>
      )}
    </div>
  );
}

BtnShare.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default BtnShare;
