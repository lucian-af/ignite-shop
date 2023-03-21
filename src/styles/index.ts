import { createStitches } from '@stitches/react';

export const {
  config,
  css,
  styled,
  globalCss,
  getCssText,
  keyframes,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: '#fff',

      gray900: '#121214',
      gray800: '#202024',
      gray300: '#c4c4cc',
      gray100: '#e1e1e1',

      green500: '#00875f',
      green300: '#00b37e',
    },

    fontSizes: {
      //** 12px */
      sm: '0.75rem',
      //** 18px */
      md: '1.125rem',
      //** 20px */
      lg: '1.25rem',
      //** 24px */
      xl: '1.5rem',
      //** 32px */
      '2xl': '2rem',
    },
  },
  media: {
    mobile: '(max-width: 600px)',
    desktop: '(min-width: 601px)',
  },
});
