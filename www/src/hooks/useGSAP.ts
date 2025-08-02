'use client';

import { useLayoutEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const gsapRef = useRef<GSAPTimeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsapRef.current = gsap.timeline();
    });

    return () => ctx.revert();
  }, []);

  return gsapRef.current;
};

export const useGSAPOnMount = (
  callback: (timeline: GSAPTimeline) => void,
  dependencies: React.DependencyList = []
) => {
  const timelineRef = useRef<GSAPTimeline | null>(null);
  
  const stableCallback = useCallback(callback, dependencies);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline();
      stableCallback(timelineRef.current);
    });

    return () => ctx.revert();
  }, [stableCallback]);

  return timelineRef.current;
};

export const animateOnScroll = (
  element: string | Element,
  animation: object,
  options: ScrollTrigger.Vars = {}
) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      ...animation,
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    }
  );
};