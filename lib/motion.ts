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

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 24, mass: 0.9 },
  },
};

/** Snappy springs for mobile drawers & taps */
export const mobileSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
  mass: 0.72,
};

export const mobileDrawerSpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 36,
  mass: 0.8,
};

export const mobileReveal = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const mobileStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

export const mobileStaggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: mobileSpring,
  },
};
