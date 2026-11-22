import React, { useState } from 'react';
import { ArrowUpRight, Laptop, Moon, Sun } from 'lucide-react';

export type ThemePref = 'light' | 'device' | 'dark';

interface IndustryItem {
  id: string;
  label: string;
  available: boolean;
  siteName?: string;
  category?: string;
  headline?: string;
  imageSrc?: string;
  imageAlt?: string;
  previewUrl?: string;
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: 'wellbeing',
    label: 'Health and Wellbeing',
    available: true,
    siteName: 'Sienna Vale',
    category: 'Women’s Fitness & Wellbeing',
    headline: 'Grounded strength and calm movement for coastal life.',
    imageSrc: '/previews/wisdom-wellbeing/src/assets/images/hero_wellbeing_studio_1794917334596.jpg',
    imageAlt: 'Sienna Vale coastal fitness and wellbeing studio preview',
    previewUrl: '/previews/wisdom-wellbeing/index.html',
  },
  {
    id: 'trades',
    label: 'Trades & Construction',
    available: true,
    siteName: 'WestGrid Electrical',
    category: 'Commercial electrical',
    headline: 'Electrical work built around your trading hours.',
    imageSrc: '/previews/electrician/src/assets/images/hero_electricians_site_1794916996135.jpg',
    imageAlt: 'WestGrid Electrical commercial electrical contracting preview',
    previewUrl: '/previews/electrician/index.html',
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    available: false,
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    available: false,
  },
  {
    id: 'not-for-profit',
    label: 'Not-for-profit',
    available: false,
  },
];

interface IndustriesSectionProps {
  themePref: ThemePref;
  onChangeThemePref: (pref: ThemePref) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  themePref,
  onChangeThemePref,
}) => {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);
  const [imgFailed, setImgFailed] = useState<Record<string, boolean>>({});

  const activeIndustry = INDUSTRIES.find((item) => item.id === activeId) ?? INDUSTRIES[0];
  const themeIndex = themePref === 'light' ? 0 : themePref === 'device' ? 1 : 2;

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % INDUSTRIES.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + INDUSTRIES.length) % INDUSTRIES.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = INDUSTRIES.length - 1;
    }
    if (nextIndex !== null) {
      e.preventDefault();
      const target = INDUSTRIES[nextIndex];
      setActiveId(target.id);
      const btn = document.getElementById(`industry-tab-${target.id}`);
      btn?.focus();
    }
  };

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="tss-ambient-section flex min-h-screen items-center py-12 sm:py-16 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10">
        {/* Top Row: Eyebrow + TechStack Sydney 3-stop Theme Slider */}
        <div className="flex items-center justify-between gap-4">
          <p className="tss-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-blue-ink)]">
            Industries
          </p>

          <div
            role="radiogroup"
            aria-label="Theme preference"
            className="relative grid grid-cols-3 items-center rounded-[10px] border border-[var(--border-subtle)] bg-[var(--slider-track-bg)] p-[3px] select-none"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-[3px] bottom-[3px] left-[3px] z-0 w-[calc(33.3333%-2px)] rounded-[7px] border transition-transform duration-200 ease-out"
              style={{
                backgroundColor: 'var(--slider-thumb-bg)',
                borderColor: 'var(--slider-thumb-border)',
                boxShadow: 'var(--slider-thumb-shadow)',
                transform: `translateX(${themeIndex * 100}%)`,
              }}
            />
            {(
              [
                { id: 'light', label: 'Light theme', Icon: Sun },
                { id: 'device', label: 'Use device setting', Icon: Laptop },
                { id: 'dark', label: 'Dark theme', Icon: Moon },
              ] as const
            ).map(({ id, label, Icon }) => {
              const checked = themePref === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  aria-label={label}
                  title={label}
                  onClick={() => onChangeThemePref(id)}
                  className={`relative z-10 inline-flex min-h-[32px] min-w-[32px] cursor-pointer items-center justify-center rounded-[7px] px-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    checked
                      ? 'text-[var(--ink-primary)]'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Heading */}
        <header className="mt-5 max-w-[680px]">
          <h1
            id="industries-heading"
            className="tss-heading text-[clamp(2rem,4.2vw,3.1rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[var(--ink-primary)] [text-wrap:balance]"
          >
            Software built around your industry
          </h1>
          <p className="mt-3.5 text-[15.5px] leading-[1.68] text-[var(--ink-secondary)] sm:text-[17px]">
            Choose an industry to explore a website mock.
          </p>
        </header>

        {/* Responsive Industry Gallery: Horizontal/Wrapped Tabs on Mobile & Tablet, 2-Column on Desktop */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:mt-10 lg:grid-cols-[minmax(14.5rem,1fr)_minmax(0,3fr)] lg:items-start lg:gap-7">
          {/* Industry Tab List */}
          <div
            role="tablist"
            aria-label="Industries"
            className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0 lg:flex-col lg:gap-2"
          >
            {INDUSTRIES.map((item, idx) => {
              const isSelected = item.id === activeIndustry.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`industry-tab-${item.id}`}
                  aria-controls={`industry-panel-${item.id}`}
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={`flex min-h-[44px] shrink-0 cursor-pointer items-center justify-between gap-3 whitespace-nowrap rounded-[12px] border px-4 py-2.5 text-left text-sm font-semibold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:w-full ${
                    isSelected
                      ? 'border-[var(--border-apex)] bg-[var(--bg-surface)] text-[var(--ink-primary)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]/65 text-[var(--ink-secondary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-surface)] hover:text-[var(--ink-primary)]'
                  }`}
                  style={{
                    boxShadow: isSelected ? 'var(--shadow-card)' : 'none',
                  }}
                >
                  <span>{item.label}</span>
                  {item.available && (
                    <span
                      className={`tss-mono text-[11px] font-medium ${
                        isSelected
                          ? 'text-[var(--accent-indigo-ink)]'
                          : 'text-[var(--ink-muted)]'
                      }`}
                    >
                      Live
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Preview Panel */}
          <div
            role="tabpanel"
            id={`industry-panel-${activeIndustry.id}`}
            aria-labelledby={`industry-tab-${activeIndustry.id}`}
            tabIndex={0}
            className="min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
          >
            {activeIndustry.available && activeIndustry.previewUrl ? (
              <a
                href={activeIndustry.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the full ${activeIndustry.siteName} website in a new window`}
                className="group block overflow-hidden rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-inherit no-underline transition-all duration-200 hover:border-[var(--border-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                {/* Top Chrome Bar */}
                <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] px-4 py-3 sm:px-5">
                  <strong className="tss-heading text-xs font-bold tracking-tight text-[var(--ink-primary)] sm:text-[13px]">
                    {activeIndustry.siteName}
                  </strong>
                  <span className="tss-mono text-xs text-[var(--ink-muted)]">Website mock</span>
                </div>

                {/* Responsive Split Preview Body */}
                <div className="grid grid-cols-1 items-center gap-5 p-5 sm:grid-cols-2 sm:gap-6 sm:p-7 md:p-9">
                  <div className="space-y-2.5">
                    <span className="tss-mono block text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent-blue-ink)] sm:text-xs">
                      {activeIndustry.category}
                    </span>
                    <strong className="tss-heading block text-[clamp(1.25rem,2.4vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-[var(--ink-primary)] [text-wrap:balance]">
                      {activeIndustry.headline}
                    </strong>
                  </div>

                  <div className="aspect-[8/5] w-full overflow-hidden rounded-[10px] border border-[var(--border-mock)] bg-[var(--bg-mock)]">
                    {!imgFailed[activeIndustry.id] && activeIndustry.imageSrc ? (
                      <img
                        src={activeIndustry.imageSrc}
                        alt={activeIndustry.imageAlt ?? ''}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setImgFailed((prev) => ({ ...prev, [activeIndustry.id]: true }))
                        }
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs text-[var(--ink-muted)]">
                        {activeIndustry.siteName} preview
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] px-4 py-3.5 sm:px-5">
                  <span className="tss-mono truncate text-xs text-[var(--ink-muted)]">
                    {activeIndustry.previewUrl}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-bold text-[var(--accent-indigo-ink)] transition-transform duration-150 group-hover:translate-x-0.5 sm:text-[13px]">
                    <span>Open full website</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </span>
                </div>
              </a>
            ) : (
              <div
                className="flex min-h-[260px] flex-col justify-between rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:min-h-[320px] sm:p-8"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div>
                  <p className="tss-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                    Website mock
                  </p>
                  <h2 className="tss-heading mt-2 text-xl font-bold tracking-[-0.02em] text-[var(--ink-primary)]">
                    {activeIndustry.label}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--ink-secondary)]">Preview coming soon</p>
                </div>
                <p className="text-xs text-[var(--ink-muted)]">
                  Select Health and Wellbeing or Trades &amp; Construction to open a full website
                  preview.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
