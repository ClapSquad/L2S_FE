import { css, keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";

export function useSlideInAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible] as const;
}

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideInAnimationCSS = css<{ $visible?: boolean }>`
  opacity: 0;
  transform: translateY(80px);
  transition: all 0.6s ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
      animation: ${slideIn} 0.8s ease forwards;
    `}
`;
