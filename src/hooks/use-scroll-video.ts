'use client';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function useScrollVideo(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  sectionRef: React.RefObject<HTMLElement | null>,
) {
  const triggerRef = useRef<ReturnType<typeof ScrollTrigger.create> | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video   = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || reduced) return;

    if (window.matchMedia('(pointer: coarse)').matches) return;

    video.pause();
    video.currentTime = 0;

    triggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1,
      onUpdate(self) {
        if (!video.duration) return;
        video.currentTime = self.progress * video.duration;
      },
    });

    return () => {
      triggerRef.current?.kill();
    };
  }, [videoRef, sectionRef, reduced]);
}
