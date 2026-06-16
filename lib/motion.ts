/** Fluid spring — low stiffness, high damping for GPU-friendly motion */
export const fluidSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 22,
  mass: 0.8,
};

export const gentleSpring = {
  type: "spring" as const,
  stiffness: 90,
  damping: 26,
  mass: 1,
};

export const revealTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};
