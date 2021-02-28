import { Link } from 'gatsby';
import React from 'react';

export default function Footer() {
  return (
    <footer>
      <p className="center">&copy; Slick's Slices {new Date().getFullYear()}</p>
      <Link to="/beers">Beers</Link>
    </footer>
  );
}
