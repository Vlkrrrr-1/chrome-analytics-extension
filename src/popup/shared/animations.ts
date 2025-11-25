import { keyframes } from "@emotion/react";

export const shineAnimation = keyframes`
  0% { transform: translateX(-100%) skewX(-20deg); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateX(100%) skewX(-20deg); opacity: 0; }
`;

export const fadeSlideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
