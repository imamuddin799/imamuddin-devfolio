'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, Menu, X, Palette } from 'lucide-react';
import GlobalSearch from '@/components/shared/GlobalSearch';

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

type ThemeId = typeof THEMES[number]['id'];

const NAV_LINKS = [
  { href: '/courses', label: 'Courses' },
  { href: '/viewer', label: 'Viewer' },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeId>('midnight-aurora');

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

  /* ── persist theme ───────────────────────────────────────── */
  useEffect(() => {
    const saved = localStorage.getItem('devfolio-theme') as ThemeId | null;
    if (saved && THEMES.some((t) => t.id === saved)) {
      applyTheme(saved);
    }
  }, []);

  const applyTheme = useCallback((id: ThemeId) => {
    document.documentElement.setAttribute('data-theme', id);
    localStorage.setItem('devfolio-theme', id);
    setActiveTheme(id);
  }, []);

  return (
    <>
      {/* ── Main bar ──────────────────────────────────────────── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-xl border-b'
            : 'backdrop-blur-sm',
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
              <span className="font-bold text-base sm:text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
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
              {/* Search */}
              <div className="hidden md:block">
                <GlobalSearch />
              </div>

              {/* Theme toggle */}
              <button
                onClick={() => setThemePanelOpen((p) => !p)}
                aria-label="Change theme"
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

      {/* ── Theme panel ───────────────────────────────────────── */}
      {themePanelOpen && (
        <div
          className="fixed top-20 right-4 sm:right-6 lg:right-8 z-50 rounded-2xl p-4 w-64 animate-scale-in"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            boxShadow: 'var(--glass-shadow)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
            Choose Theme
          </p>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => applyTheme(theme.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-medium transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: activeTheme === theme.id ? 'var(--glass-bg-hover)' : 'var(--glass-bg)',
                  border: activeTheme === theme.id
                    ? `1px solid ${theme.color}`
                    : '1px solid var(--border-subtle)',
                  color: activeTheme === theme.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    background: theme.color,
                    boxShadow: activeTheme === theme.id ? `0 0 8px ${theme.color}` : 'none',
                  }}
                />
                <span className="truncate">{theme.label}</span>
              </button>
            ))}
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

      {/* ── Backdrop (closes panels) ──────────────────────────── */}
      {(menuOpen || themePanelOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => { setMenuOpen(false); setThemePanelOpen(false); }}
        />
      )}

      {/* ── Spacer so content doesn't hide under fixed bar ───── */}
      <div className="h-16" />
    </>
  );
}