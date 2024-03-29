import Link from 'next/link';
import { styled } from '..';

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,

  '@mobile': {
    minHeight: 470,
    width: '100%',
  },
});

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  cursor: 'pointer',
  position: 'relative',

  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',
    color: '$gray100',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '$gray800',

    '@desktop': {
      transform: 'translateY(110%)',
      opacity: 0,
      transition: 'all 0.2s ease-in-out',
    },

    strong: {
      fontSize: '$lg',

      '@mobile': {
        fontSize: '1rem',
      },
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',

      '@mobile': {
        fontSize: '$md',
      },
    },

    div: {
      display: 'flex',
      flexDirection: 'column',
      gap: '.25rem',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
});

export const CartContainer = styled(Link, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 56,
  height: 56,
  borderRadius: 8,
  background: '$green500',
  color: '$white',

  '&:hover': {
    background: '$green300',
  },
});

export const Arrow = styled('svg', {
  width: '30px',
  height: '30px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  fill: '#fff',
  cursor: 'pointer',

  variants: {
    disabled: {
      true: {
        fill: 'rgba(255, 255, 255, 0.5)',
      },
    },
    position: {
      left: {
        left: '5px',
      },
      right: {
        left: 'auto',
        right: '5px',
      },
    },
  },
});
