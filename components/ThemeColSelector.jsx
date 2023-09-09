import React from 'react';
import {useThemeCol} from './ThemeContext';

const ThemeSelector = () => {
  const {color, setColor, colorOptions} = useThemeCol();

  const handleColorChange = (event) => {
    const selectedColor = colorOptions.find(
        (colorOption) => colorOption.name === event.target.value,
    );
    setColor(selectedColor);
  };

  return (
    <div className="color-dropdown-container">
      <select
        value={color.name}
        onChange={handleColorChange}
        className="color-dropdown"
      >
        {colorOptions.map((colorOption, mode) => (
          <option key={mode} value={colorOption.name}>
            {colorOption.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
