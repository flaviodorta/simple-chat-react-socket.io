import { DefaultTheme } from 'styled-components';

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '976px',
  xl: '1440px',
};

export const baseTheme = {
  colors: {
    white: {
      one: 'rgb(255, 255, 255)',
      two: 'rgb(250, 250, 250)',
      three: 'rgb(238, 238, 238)',
    },

    grey: {
      one: 'rgb(208, 208, 208)',
      two: 'rgb(176, 176, 176)',
      three: 'rgb(125, 125, 125)',
      four: 'rgb(80, 80, 80)',
    },

    red: 'rgb(255, 76, 48)',
    orange: 'rgb(230, 126, 34)',
    yellow: 'rgb(245, 229, 27)',
    blue: 'rgb(40, 67, 135)',
    purple: 'rgb(165, 55, 253)',
    green: 'rgb(38, 194, 129)',
  },

  sizes: {
    icon: '2rem',
  },

  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;',
};

export const light: DefaultTheme = {
  mode: 'light',

  colors: {
    ...baseTheme.colors,

    primary: {
      one: '#3D5593',
    },

    font: '#202020',
  },

  sizes: {
    ...baseTheme.sizes,
  },

  boxShadow: baseTheme.boxShadow,
};

export const dark: DefaultTheme = {
  mode: 'dark',

  colors: {
    ...baseTheme.colors,

    primary: {
      one: '#121212',
      two: '#181818',
      three: '#282828',
      four: '#404040',
    },
    font: '#FFFFFF',
  },

  sizes: {
    ...baseTheme.sizes,
  },

  boxShadow: baseTheme.boxShadow,
};
