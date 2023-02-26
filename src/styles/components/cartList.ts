import * as Dialog from '@radix-ui/react-dialog';
import { styled } from '..';

export const Content = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  width: 480,
  height: '100vh',
  background: '$gray800',
  padding: '4.5rem 2rem',

  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  '@mobile': {
    width: '100%',
  },
});

export const Title = styled(Dialog.Title, {
  fontSize: '$lg',
  color: '$gray100',
});

export const List = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  overflowY: 'auto',
  minHeight: '60%',
});

export const Product = styled('div', {
  width: '100%',
  display: 'flex',
  gap: '1rem',
});

export const ProductImage = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  width: 102,
  height: 93,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
});

export const ProductContent = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: '.5rem',
  fontSize: '$md',

  '@mobile': {
    fontSize: '1rem',
  },

  p: {
    color: '$gray300',
  },

  span: {
    color: '$gray100',
    fontWeight: 'bold',
  },

  button: {
    border: 'none',
    background: 'transparent',
    outline: 'none',

    height: '1.25rem',
    textAlign: 'center',
    cursor: 'pointer',

    color: '$green500',
    fontSize: '1rem',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    },
  },
});

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',
  cursor: 'pointer',
  color: '$gray100',
});

export const Summary = styled('footer', {
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '$gray100',
    alignItems: 'baseline',
    fontWeight: 'bold',

    span: {
      fontSize: '$md',
    },

    'span:last-child': {
      fontSize: '$xl',
    },
  },

  'div:first-child': {
    color: '$gray300',
    fontSize: '1rem',

    'span:first-child': {
      fontSize: '1rem',
      fontWeight: 'normal',
    },

    'span:last-child': {
      fontSize: '$md',
      fontWeight: 'normal',
    },
  },

  button: {
    marginTop: '3.5rem',
    height: 69,
    borderRadius: 8,
    padding: '1.25rem 2rem',
    cursor: 'pointer',

    background: '$green500',
    color: '$white',

    fontSize: '1rem',
    fontWeight: 'bold',

    '&:hover': {
      background: '$green300',
    },
  },
});

export const CartEmpty = styled('span', {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$lg',
  color: '$gray100',
});
