import { motion, Transition, useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  style?: React.CSSProperties;
  startDelay?: number;
  enableScrollAnimation?: boolean;
  scrollStart?: number;
  scrollEnd?: number;
  scrollYRange?: [number, number];
  scrollBlurRange?: [number, number];
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 400,
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  style,
  startDelay = 0,
  enableScrollAnimation = false,
  scrollStart = 0,
  scrollEnd = 300,
  scrollYRange = [0, -100],
  scrollBlurRange = [0, 10],
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  // Scroll-based animation setup - compatible with Lenis smooth scrolling
  const { scrollY } = useScroll();
  const scrollYTransform = useTransform(scrollY, [scrollStart, scrollEnd], scrollYRange);
  const scrollBlurTransform = useTransform(scrollY, [scrollStart, scrollEnd], scrollBlurRange);

  // Ease-in-out quart function for scroll animation
  const easeInOutQuart = (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  };

  // Apply easing to scroll transforms
  const scrollYEased = useTransform(scrollY, [scrollStart, scrollEnd], scrollYRange, {
    ease: easeInOutQuart
  });
  const scrollBlurEased = useTransform(scrollY, [scrollStart, scrollEnd], scrollBlurRange, {
    ease: easeInOutQuart
  });
  
  // Convert scroll blur value to CSS filter string
  const scrollBlurFilter = useTransform(scrollBlurEased, (value) => `blur(${value}px)`);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply start delay before triggering animation
          setTimeout(() => {
            setInView(true);
          }, startDelay);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, startDelay]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`} style={style}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
        };
        (spanTransition as any).ease = easing;

        const handleAnimationComplete = () => {
          if (index === elements.length - 1) {
            setAnimationComplete(true);
            onAnimationComplete?.();
          }
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={handleAnimationComplete}
            style={{
              display: "inline-block",
              willChange: "transform, filter, opacity",
              // Apply scroll-based transforms when animation is complete and scroll is enabled
              y: enableScrollAnimation && animationComplete ? scrollYEased : undefined,
              filter: enableScrollAnimation && animationComplete 
                ? scrollBlurFilter 
                : undefined,
            }}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText; 