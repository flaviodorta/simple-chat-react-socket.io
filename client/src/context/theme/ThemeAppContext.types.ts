import React from 'react';

export type AppThemeContextType = {
  toggleMode: () => void;
  mode: string;
};

export type AppThemeProviderProps = {
  children: React.ReactNode;
};
