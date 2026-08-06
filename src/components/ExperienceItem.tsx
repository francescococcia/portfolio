import { useState } from 'react';
import './ExperienceItem.css';

interface ExperienceItemProps {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
  tech: string[];
  isLast?: boolean;
}

export default function ExperienceItem({
  company,
  role,
  dates,
  location,
  bullets,
  tech,
  isLast = false,
}: ExperienceItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`exp-item${isLast ? ' exp-item--last' : ''}`}>
      <div className="exp-item__dot" aria-hidden="true" />

      <div className="exp-item__body">
        <button
          className="exp-item__header"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <div className="exp-item__header-left">
            <span className="exp-item__company">{company}</span>
            <span className="exp-item__role">{role}</span>
          </div>
          <div className="exp-item__header-right">
            <span className="exp-item__dates">{dates}</span>
            <span className="exp-item__location">{location}</span>
            <span className="exp-item__toggle" aria-hidden="true">
              {open ? '−' : '+'}
            </span>
          </div>
        </button>

        <div className="exp-item__tech">
          {tech.map((t) => (
            <span key={t} className="badge">
              {t}
            </span>
          ))}
        </div>

        {open && (
          <ul className="exp-item__bullets">
            {bullets.map((b, i) => (
              <li key={i} className="exp-item__bullet">
                <span className="exp-item__bullet-arrow" aria-hidden="true">▸</span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
