import { globalCss } from '.';

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    backgroundColor: '$gray900',
    color: '$gray100',

    '@mobile': {
      padding: '0 1.5rem 3rem',
    },
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
});
