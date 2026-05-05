/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0a',
          card: '#111111',
          'card-elevated': '#141414',
        },
        border: {
          subtle: '#1f1f1f',
          DEFAULT: '#262626',
          strong: '#404040',
        },
        text: {
          primary: '#f5f5f5',
          body: '#d4d4d4',
          secondary: '#a3a3a3',
          tertiary: '#737373',
        },
        accent: {
          DEFAULT: '#5eead4',
          'on-dark': '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // sizes carefully chosen to match the locked type scale in the handoff
        'hero': ['44px', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '500' }],
        'page-h1': ['28px', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '500' }],
        'h2': ['24px', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '500' }],
        'card-lead': ['20px', { lineHeight: '1.3', fontWeight: '500' }],
        'card': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
        'card-sm': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lead': ['18px', { lineHeight: '1.65', letterSpacing: '-0.005em', fontWeight: '400' }],
        'body': ['15px', { lineHeight: '1.65', fontWeight: '400' }],
        'card-body': ['13px', { lineHeight: '1.6', fontWeight: '400' }],
        'mono-label': ['11px', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '500' }],
        'mono-meta': ['10px', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '400' }],
      },
      letterSpacing: {
        tightest: '-0.025em',
        tighter: '-0.015em',
        tight: '-0.005em',
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.12em',
      },
      borderRadius: {
        card: '12px',
        chip: '8px',
      },
      borderWidth: {
        hairline: '0.5px',
      },
      maxWidth: {
        page: '1200px',
        prose: '720px',
        hero: '580px',
      },
      spacing: {
        section: '5rem',
        'section-tight': '4rem',
      },
    },
  },
  plugins: [],
};
