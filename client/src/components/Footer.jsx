import React from 'react';
import PropTypes from 'prop-types';

/**
 * Props‑driven footer.
 *
 * @param {string} text — the footer text before the year
 * @param {number} year — the copyright year
 */
export default function Footer({ text, year = new Date().getFullYear() }) {
  return (
    <footer className="bg-light text-center py-3 mt-4">
      <small>{text} © {year}</small>
    </footer>
  );
}

Footer.propTypes = {
  text: PropTypes.string.isRequired,
  year: PropTypes.number,
};
