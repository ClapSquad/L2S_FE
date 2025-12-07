import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      textSecondary: string;
      inputBackground: string;
      inputBorder: string;
      inputPlaceholder: string;
      cardShadow: string;
      navBackground?: string;
      navShadow?: string;
      modalBackground?: string;
      border?: string;
    };
  }
}