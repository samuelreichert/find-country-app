import React, { useState } from 'react';
import { Header as HeaderComp, HeaderContent, Title, ToggleMode } from './style';

const Header = () => {
  const localDarkMode = JSON.parse(localStorage.getItem('DARK_MODE'));
  const [darkMode, setDarkMode] = useState(localDarkMode);

  const modeIcon = darkMode ? 'fa-sun' : 'fa-moon';
  const modeText = darkMode ? 'Light Mode' : 'Dark Mode';

  const toggleMode = () => {
    localStorage.setItem('DARK_MODE', !darkMode);
    setDarkMode(!darkMode);
  };

  return (
    <HeaderComp>
      <HeaderContent>
        <Title>Where in the world?</Title>

        <ToggleMode onClick={toggleMode}>
          <i className={`far ${modeIcon}`}></i>
          <span>{ modeText }</span>
        </ToggleMode>
      </HeaderContent>
    </HeaderComp>
  );
};

export default Header;
