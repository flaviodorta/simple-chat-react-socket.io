import { useContext, createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { usePersistedState } from '../../hooks/usePersistedState';
import { dark, light } from '../../styles/theme/theme';
import {
  AppThemeContextType,
  AppThemeProviderProps,
} from './ThemeAppContext.types';

const initialValue = {
  mode: 'light',
  toggleMode: () => {},
};

const AppThemeContext = createContext<AppThemeContextType>(initialValue);

export const useAppTheme = () => useContext(AppThemeContext);

export function AppThemeProvider(props: AppThemeProviderProps): JSX.Element {
  const [mode, setMode] = usePersistedState<string>('mode', 'light');

  const toggleMode = () => {
    console.log('click');
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={mode === 'light' ? light : dark}>
      <AppThemeContext.Provider value={{ mode, toggleMode }}>
        {props.children}
      </AppThemeContext.Provider>
    </ThemeProvider>
  );
}
