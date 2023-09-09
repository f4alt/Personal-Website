import React, {useState} from 'react';
import {useThemeEnv} from './ThemeContext';

const ThemeSelector = () => {
  const [isChecked, setIsChecked] = useState(true);
  const {env, toggleEnv} = useThemeEnv();

  const handleToggleEnv = () => {
    setIsChecked((prevChecked) => !prevChecked);
    toggleEnv();
  };

  return (
    <div className="position-label-container">
      <label className="position-label left-label">Win</label>
      <label className={isChecked ? 'theme-switch checked' : 'theme-switch'}>
        <input type="checkbox" onChange={handleToggleEnv} />
        <span className="theme-slider"></span>
      </label>
      <label className="position-label right-label">Mac</label>
    </div>
  );
};

export default ThemeSelector;
