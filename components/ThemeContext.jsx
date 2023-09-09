import React, {createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect} from 'react';

const ThemeEnvironmentContext = createContext();
const ThemeColorContext = createContext();

/* Define a list of color options
 * NOTE(s): mode should match colorThemes.css
 *          primary is used for particle background color
 *          secondary is used for code editor background color
 */
const colorOptions = [
  {name: 'Classic', mode: 0, primary: '#173344', secondary: '#97b3bf'},
  {name: 'Tropical Breeze', mode: 1, primary: '#00539C', secondary: '#EEA47F'},
  {name: 'Candy Land', mode: 2, primary: '#F96167', secondary: '#F9E795'},
  {name: 'Cyberpunk', mode: 3, primary: '#FF69B4', secondary: '#00FFFF'},
  {name: 'Sailor', mode: 4, primary: '#234E70', secondary: '#FBF8BE'},
  {name: 'Behind Bars', mode: 5, primary: '#000000', secondary: '#f0f0f0'},
  {name: 'Electron White', mode: 6, primary: '#060e57', secondary: '#ebebeb'},
];

const ThemeProvider = ({children}) => {
  const [env, setEnv] = useState('mac');
  const [prevEnv, setPrevEnv] = useState(env);
  const [color, setColor] = useState(colorOptions[0]);

  const toggleEnv = () => {
    setEnv(env === 'mac' ? 'windows' : 'mac');
  };

  const updateStyles = () => {
    // remove previous color mode
    document.documentElement.classList.forEach((className) => {
      if (className.startsWith('mode')) {
        document.documentElement.classList.remove(className);
      }
    });

    // add current color mode
    document.documentElement.classList.add(`mode-${color.mode}`);
  };

  useLayoutEffect(() => {
    updateStyles();
  }, [env, color]);

  // check for 'mobile' screen sizes on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPrevEnv(env);
        setEnv('mobile');
      } else {
        if (env === 'mobile') {
          setEnv(prevEnv);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    // clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [env, color]);

  return (
    <ThemeEnvironmentContext.Provider value={{env, toggleEnv}}>
      <ThemeColorContext.Provider value={{color, setColor, colorOptions}}>
        {children}
      </ThemeColorContext.Provider>
    </ThemeEnvironmentContext.Provider>

  );
};

const useThemeEnv = () => {
  const context = useContext(ThemeEnvironmentContext);
  if (context === undefined) {
    throw new Error('useThemeEnv must be used within a ThemeProvider');
  }
  return context;
};

const useThemeCol = () => {
  const context = useContext(ThemeColorContext);
  if (context === undefined) {
    throw new Error('useThemeCol must be used within a ThemeProvider');
  }
  return context;
};

export {ThemeProvider, useThemeEnv, useThemeCol};
