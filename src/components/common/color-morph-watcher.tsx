'use client';
import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function ColorMorphWatcher() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-bg]');
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    sections.forEach((section) => {
      const bg   = section.dataset.bg!;
      const text = section.dataset.text!;

      triggers.push(ScrollTrigger.create({
        trigger: section,
        start:   'top 55%',
        end:     'bottom 45%',
        onEnter:     () => morph(bg, text),
        onEnterBack: () => morph(bg, text),
      }));
    });

    function morph(bg: string, text: string) {
      gsap.to('body', {
        backgroundColor: bg,
        color:           text,
        duration:        0.6,
        ease:            'power2.out',
        overwrite:       true,
      });
    }

    return () => triggers.forEach(t => t.kill());
  }, []);

  return null;
}
