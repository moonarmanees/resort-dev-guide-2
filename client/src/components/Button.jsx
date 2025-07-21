
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Bootstrap‑style button.
 *
 * @param {string} label   — the button text
 * @param {() => void} onClick — click handler
 * @param {string} variant — one of 'primary', 'secondary', etc.
 */
export default function Button({ label, onClick, variant = 'primary' }) {
  return (
    <button
      type="button"
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label:    PropTypes.string.isRequired,
  onClick:  PropTypes.func,
  variant:  PropTypes.string,
};

