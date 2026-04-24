import type { Service, Testimonial } from '@/types';

export const services: Service[] = [
  {
    id:          'web',
    title:       'Web Design & Build',
    description: 'From information architecture to the last animation — sites that load fast, read clearly, and perform exactly as the brief demands.',
  },
  {
    id:          'branding',
    title:       'Brand Identity',
    description: 'Mark, colour, type, and voice. A system that holds together whether it\'s on a screen, a label, or a business card.',
  },
  {
    id:          'video',
    title:       'Film & Motion',
    description: 'Campaign films, product reels, and motion identity. Shot and edited in-house, finished with the same craft as everything else we make.',
  },
  {
    id:          'strategy',
    title:       'Digital Strategy',
    description: 'Audience mapping, channel planning, and conversion architecture — the thinking that makes the making worth doing.',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:   'They asked better questions in the first meeting than any agency we\'d worked with before. The site they delivered doubled our time-on-page within a month.',
    author:  'Sophie Verdier',
    role:    'Creative Director',
    company: 'Maison Verdier',
  },
  {
    quote:   'The identity felt inevitable — like it had always existed. That\'s the hardest thing to achieve and they made it look effortless.',
    author:  'Marc Brun',
    role:    'Founding Partner',
    company: 'Atelier Brun',
  },
  {
    quote:   'Every decision was explained, every timeline was met. Rare to find a team that is as organised as they are creative.',
    author:  'Isabelle Morel',
    role:    'Programme Director',
    company: 'Collectif Nord',
  },
];
