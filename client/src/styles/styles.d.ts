import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: string;

    colors: {
      primary: {
        one: string;
        two?: string;
        three?: string;
        four?: string;
      };

      white: {
        one: string;
        two: string;
        three: string;
      };

      grey: {
        one: string;
        two: string;
        three: string;
        four: string;
      };

      red: string;
      orange: string;
      yellow: string;
      blue: string;
      purple: string;
      font: string;
    };

    sizes: {
      icon: string;
    };

    boxShadow: string;
  }
}
