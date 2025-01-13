import React from 'react';
import './Loading.css';

// Типизация компонента Spinner
const Spinner: React.FC = () => (
  <div className="loading-container">
    <div className="spinner"></div>
  </div>
);

export default Spinner;
