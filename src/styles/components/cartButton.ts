import { styled } from '..';

export const CartContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 56,
  height: 56,
  borderRadius: 8,
  background: '$gray800',
  cursor: 'pointer',
  position: 'relative',

  '&:hover': {
    background: '$gray900',
  },
});

export const CartAmount = styled('span', {
  variants: {
    show: {
      true: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: '$green500',

        position: 'absolute',
        top: -5,
        right: -5,

        border: '2px solid $gray900',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '$sm',
        fontWeight: 'bold',
      },
    },
  },
});
