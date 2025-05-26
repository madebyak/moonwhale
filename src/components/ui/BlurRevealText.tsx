'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Debounce utility function
const debounce = (func: Function, delay: number) => {
  let timerId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// TextSplitter class
class TextSplitter {
  private textElement: HTMLElement;
  private splitText: SplitType;
  private onResize: (() => void) | null;
  private previousContainerWidth: number | null = null;

  constructor(textElement: HTMLElement, options: { resizeCallback?: () => void; splitTypeTypes?: string } = {}) {
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.');
    }

    const { resizeCallback, splitTypeTypes } = options;
    
    this.textElement = textElement;
    this.onResize = typeof resizeCallback === 'function' ? resizeCallback : null;
    
    const splitOptions = splitTypeTypes ? { types: splitTypeTypes as any } : {};
    this.splitText = new SplitType(this.textElement, splitOptions);

    if (this.onResize) {
      this.initResizeObserver();
    }
  }

  private initResizeObserver() {
    const resizeObserver = new ResizeObserver(
      debounce((entries: ResizeObserverEntry[]) => this.handleResize(entries), 100)
    );
    resizeObserver.observe(this.textElement);
  }

  private handleResize(entries: ResizeObserverEntry[]) {
    const [{ contentRect }] = entries;
    const width = Math.floor(contentRect.width);
    if (this.previousContainerWidth && this.previousContainerWidth !== width) {
      this.splitText.split({});
      if (this.onResize) {
        this.onResize();
      }
    }
    this.previousContainerWidth = width;
  }

  getChars() {
    return this.splitText.chars;
  }

  getWords() {
    return this.splitText.words;
  }

  getLines() {
    return this.splitText.lines;
  }
}

// BlurScrollEffect class (Effect 3 implementation)
class BlurScrollEffect {
  private textElement: HTMLElement;
  private splitter!: TextSplitter;

  constructor(textElement: HTMLElement) {
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.');
    }

    this.textElement = textElement;
    this.initializeEffect();
  }

  private initializeEffect() {
    const textResizeCallback = () => this.scroll();

    this.splitter = new TextSplitter(this.textElement, {
      resizeCallback: textResizeCallback,
      splitTypeTypes: 'words, chars'
    });
    
    this.scroll();
  }

  private scroll() {
    const chars = this.splitter.getChars();
    
    if (!chars || chars.length === 0) {
      console.warn('No characters found for animation');
      return;
    }

    gsap.fromTo(chars, {
      scaleY: 0.1,
      scaleX: 1.8,
      filter: 'blur(10px) brightness(50%)',
      willChange: 'filter, transform'
    }, {
      ease: 'none', 
      scaleY: 1,
      scaleX: 1,
      filter: 'blur(0px) brightness(100%)',
      stagger: 0.05, 
      scrollTrigger: {
        trigger: this.textElement,
        start: 'top bottom-=15%', 
        end: 'bottom center+=15%',
        scrub: true,
      },
    });
  }
}

interface BlurRevealTextProps {
  text: string;
  className?: string;
  isRTL?: boolean;
}

const BlurRevealText: React.FC<BlurRevealTextProps> = ({ 
  text, 
  className = '', 
  isRTL = false 
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<BlurScrollEffect | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    try {
      // Clean up existing effect
      if (effectRef.current) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === textRef.current) {
            trigger.kill();
          }
        });
      }

      // Create new effect
      effectRef.current = new BlurScrollEffect(textRef.current);
      
      console.log('BlurRevealText effect initialized');
    } catch (error) {
      console.error('Error initializing BlurRevealText:', error);
    }

    return () => {
      // Cleanup on unmount
      if (textRef.current) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === textRef.current) {
            trigger.kill();
          }
        });
      }
    };
  }, [text]);

  return (
    <div
      ref={textRef}
      className={`blur-reveal-text ${className}`}
      style={{
        direction: isRTL ? 'rtl' : 'ltr',
        willChange: 'transform, filter'
      }}
    >
      {text}
    </div>
  );
};

export default BlurRevealText; 