import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

interface Props {
  sections: Section[];
}

const SideRail: React.FC<Props> = ({ sections }) => {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '');
  const { scrollY } = useScroll();
  // Le rail apparaît seulement après le 1er écran
  const opacity = useTransform(scrollY, [0, 300, 600], [0, 0, 1]);
  const x = useTransform(scrollY, [0, 600], [16, 0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const opts: IntersectionObserverInit = {
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    };
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(s.id);
        });
      }, opts);
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      className="cine-rail"
      style={{ opacity, x }}
      aria-label="Navigation des actes"
    >
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          className="cine-rail-dot"
          aria-current={active === s.id}
          aria-label={`Aller à ${s.label}`}
          onClick={() => goTo(s.id)}
        >
          <span className="label">{s.label}</span>
        </button>
      ))}
    </motion.nav>
  );
};

export default SideRail;
