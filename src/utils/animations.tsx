export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25 },
    exit: { opacity: 0, y: -20 }
};
  
export const fadeInDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0},
    transition: { duration: 0.25 },
    exit: { opacity: 0, y: 20 }
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
};

export const scaleIn = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { type: "spring", stiffness: 260, damping: 20 }
};

export const bounce = {
    initial: { scale: 0.8 },
    animate: { scale: 1 },
    transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
    }
};

export const rotate = {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
    transition: { duration: 1, ease: "easeInOut" }
};

export const scaleOnHover = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 }
};

export const scaleOnHoverSmall = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
};

export const pulse = {
    animate: {
        scale: [1, 1.1, 1],
        transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse" as const
        }
    }
};