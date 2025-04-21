
// Animation utility functions for the Aptitude Genie game

export const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  pulse: {
    animate: { 
      scale: [1, 1.02, 1],
      transition: { 
        duration: 1.5, 
        repeat: Infinity,
        repeatType: "loop" 
      }
    }
  }
};

export const transitions = {
  default: { duration: 0.3, ease: "easeInOut" },
  slow: { duration: 0.6, ease: "easeInOut" },
  fast: { duration: 0.15, ease: "easeOut" },
};

export function getStaggeredChildren(count: number, delay: number = 0.05) {
  return Array.from({ length: count }).map((_, i) => ({
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: i * delay }
    }
  }));
}
