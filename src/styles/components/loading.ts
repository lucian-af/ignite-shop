import { keyframes, styled } from '@stitches/react';

const scaleUp = keyframes({
  from: {
    transform: 'scale3d(1, 1, 1)',
  },

  '50%': {
    transform: 'scale3d(1.05, 1.05, 1.05)',
  },

  to: {
    transform: 'scale3d(1, 1, 1)',
  },
});

export const Container = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const Wrapper = styled('div', {
  height: '52px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  p: {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    color: '$gray300',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    animationName: `${scaleUp}`,
    animationTimingFunction: 'ease-in-out',
    animationDuration: '1500ms',
    animationIterationCount: 'infinite',
  },
});
