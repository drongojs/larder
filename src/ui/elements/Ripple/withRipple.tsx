import React, { ReactNode, useState, useCallback, ComponentType } from 'react';
import { css } from 'linaria';
import theme from 'ui/theme';
import { useTimeoutEffect } from 'ui/hooks';

const DURATION = 1500;

const styles = {
  root: css`
    position: absolute;
    left: 50%;
    top: 50%;
    height: 1rem;
    width: 1rem;
    background-color: ${theme.palette.grey01.color};
    border-radius: 50%;
    transform: translateX(-50%) translateY(-50%);
    animation: ripple ${DURATION}ms ease-out forwards, fade ${DURATION}ms ease-out forwards;

    @keyframes ripple {
        0% {
          transform: translateX(-50%) translateY(-50%);
        }
        80% {
          transform: translateX(-50%) translateY(-50%) scale(50);
        }
        100% {
          transform: translateX(-50%) translateY(-50%) scale(50);
        }
      }

      @keyframes fade {
        0% {
          opacity: 0.5;
        }
        100% {
          opacity: 0;
        }
      }
  `,
};

interface BaseProps {
  onClick?: (e: any) => any,
  children?: ReactNode,
}

function withRipple<P extends BaseProps>(C: ComponentType<P>) {
  const Ripple = ({
    onClick,
    children,
    ...props
  }: P) => {
    const [ clicked, setClicked ] = useState(false);

    const handleClick = useCallback((e: any) => {
      setClicked(true);
      setTimeout(() => {
        onClick?.(e);
      }, DURATION / 4);
    }, [ setClicked, onClick ]);

    useTimeoutEffect(DURATION, () => {
      if (clicked) {
        setClicked(false);
      }
    }, [ setClicked, clicked ]);

    return (
      // @ts-ignore
      <C
        {...props}
        onClick={handleClick}
      >
        {clicked && <span className={styles.root}/>}
        {children}
      </C>
    );
  };
  return Ripple;
}

export default withRipple;
