'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, Menu, X, Palette } from 'lucide-react';

const THEMES = [
  { id: 'midnight-aurora', label: 'Midnight Aurora', color: '#06b6d4' },
  { id: 'obsidian-flame', label: 'Obsidian Flame', color: '#f97316' },
  { id: 'emerald-depths', label: 'Emerald Depths', color: '#34d399' },
  { id: 'violet-cosmos', label: 'Violet Cosmos', color: '#a78bfa' },
  { id: 'rose-gold-noir', label: 'Rose Gold Noir', color: '#fb7185' },
  { id: 'arctic-steel', label: 'Arctic Steel', color: '#7dd3fc' },
  { id: 'golden-hour', label: 'Golden Hour', color: '#fbbf24' },
  { id: 'matrix-green', label: 'Matrix Green', color: '#00ff41' },
  { id: 'neon-tokyo', label: 'Neon Tokyo', color: '#ec4899' },
  { id: 'deep-ocean', label: 'Deep Ocean', color: '#0ea5e9' },
] as const;

type ThemeId = (typeof THEMES)[number]['id'];

const THEME_IDS = THEMES.map((t) => t.id);

function isValidThemeId(id: string): id is ThemeId {
  return (THEME_IDS as readonly string[]).includes(id);
}

const NAV_LINKS = [
  { href: '/courses', label: 'Courses' },
  { href: '/viewer', label: 'Viewer' },
] as const;

/* ── Applies theme by setting data-theme on <html> and updating body bg ── */
function applyThemeToDOM(id: ThemeId): void {
  document.documentElement.setAttribute('data-theme', id);
  localStorage.setItem('devfolio-theme', id);
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeId>('midnight-aurora');

  const paletteButtonRef = useRef<HTMLButtonElement>(null);

  /* ── scroll listener ─────────────────────────────────────── */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* ── close panels on route change ───────────────────────── */
  useEffect(() => {
    setMenuOpen(false);
    setThemePanelOpen(false);
  }, [pathname]);

  /* ── restore persisted theme on mount ───────────────────── */
  useEffect(() => {
    const saved = localStorage.getItem('devfolio-theme');
    if (saved !== null && isValidThemeId(saved)) {
      applyThemeToDOM(saved);
      setActiveTheme(saved);
    }
  }, []); // runs once on mount — intentional

  function handleThemeSelect(id: ThemeId): void {
    applyThemeToDOM(id);
    setActiveTheme(id);
    setThemePanelOpen(false);
  }

  return (
    <>
      {/* ── Main bar ──────────────────────────────────────────── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'backdrop-blur-xl border-b' : 'backdrop-blur-sm',
        ].join(' ')}
        style={{
          background: scrolled ? 'var(--bg-overlay)' : 'transparent',
          borderColor: scrolled ? 'var(--border-subtle)' : 'transparent',
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/courses" className="flex items-center gap-2 group">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-default)',
                }}
              >
                <Code2 className="w-4 h-4" style={{ color: 'var(--accent-1)' }} />
              </span>
              <span
                className="font-bold text-base sm:text-lg tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                imam<span style={{ color: 'var(--accent-1)' }}>uddin</span>
                <span className="hidden sm:inline" style={{ color: 'var(--text-secondary)' }}>.dev</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      color: active ? 'var(--accent-1)' : 'var(--text-secondary)',
                      background: active ? 'var(--glass-bg)' : 'transparent',
                      border: active ? '1px solid var(--border-default)' : '1px solid transparent',
                    }}
                  >
                    {label}
                    {active && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: 'var(--accent-1)' }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">

              {/* Theme toggle */}
              <button
                ref={paletteButtonRef}
                onClick={() => setThemePanelOpen((p) => !p)}
                aria-label="Change theme"
                aria-expanded={themePanelOpen}
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  background: themePanelOpen ? 'var(--glass-bg-hover)' : 'var(--glass-bg)',
                  border: '1px solid var(--border-default)',
                }}
              >
                <Palette className="w-4 h-4" style={{ color: 'var(--accent-1)' }} />
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen((p) => !p)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-default)',
                }}
              >
                {menuOpen
                  ? <X className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                  : <Menu className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Theme panel ───────────────────────────────────────────
          Positioned fixed so it's never clipped by parent overflow.
          right-4/sm:right-6/lg:right-8 mirrors the navbar padding.
      ────────────────────────────────────────────────────────── */}
      {themePanelOpen && (
        <div
          role="dialog"
          aria-label="Choose theme"
          className="fixed top-[4.5rem] right-4 sm:right-6 lg:right-8 z-[60] rounded-2xl p-4 w-56 animate-scale-in"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            boxShadow: 'var(--glass-shadow)',
            backdropFilter: 'blur(24px)',
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--text-muted)' }}
          >
            Choose Theme
          </p>

          <div className="grid grid-cols-1 gap-1.5">
            {THEMES.map((theme) => {
              const isActive = activeTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    background: isActive ? 'var(--glass-bg-hover)' : 'var(--glass-bg)',
                    border: isActive ? `1px solid ${theme.color}` : '1px solid var(--border-subtle)',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      background: theme.color,
                      boxShadow: isActive ? `0 0 8px ${theme.color}80` : 'none',
                    }}
                  />
                  <span className="truncate">{theme.label}</span>
                  {isActive && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: theme.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="md:hidden fixed top-16 left-0 right-0 z-40 px-4 pt-2 pb-4 animate-fade-in-up"
          style={{
            background: 'var(--bg-overlay)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    color: active ? 'var(--accent-1)' : 'var(--text-secondary)',
                    background: active ? 'var(--glass-bg)' : 'transparent',
                    border: active ? '1px solid var(--border-default)' : '1px solid transparent',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* ── Backdrop (closes panels) — z-[55] sits between panel(60) and content(40) */}
      {(menuOpen || themePanelOpen) && (
        <div
          className="fixed inset-0 z-[55]"
          onClick={() => { setMenuOpen(false); setThemePanelOpen(false); }}
          aria-hidden="true"
        />
      )}

      {/* ── Spacer so content doesn't hide under fixed bar ───── */}
      <div className="h-16" />
    </>
  );
}