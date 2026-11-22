import { useCallback, useEffect, useState } from 'react';
import { IndustriesSection, type ThemePref } from './components/IndustriesSection';

export default function App() {
  const [themePref, setThemePref] = useState<ThemePref>(() => {
    try {
      const stored = localStorage.getItem('tss-theme-pref');
      return stored === 'light' || stored === 'dark' || stored === 'device' ? stored : 'device';
    } catch {
      return 'device';
    }
  });

  const applyTheme = useCallback((pref: ThemePref) => {
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = pref === 'device' ? (prefersDark ? 'dark' : 'light') : pref;
    document.documentElement.setAttribute('data-theme-pref', pref);
    document.documentElement.setAttribute('data-theme', resolved);
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    applyTheme(themePref);
    try {
      localStorage.setItem('tss-theme-pref', themePref);
    } catch {
      // ignore storage errors
    }

    if (themePref !== 'device' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = () => applyTheme('device');
    mql.addEventListener('change', onSystemChange);
    return () => mql.removeEventListener('change', onSystemChange);
  }, [themePref, applyTheme]);

  return (
    <main className="min-h-screen bg-[var(--bg-canvas)] text-[var(--ink-primary)]">
      <IndustriesSection themePref={themePref} onChangeThemePref={setThemePref} />
    </main>
  );
}
