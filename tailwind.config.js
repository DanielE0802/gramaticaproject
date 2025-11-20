/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#10b981',
        background: '#f8fafc',
        card: '#ffffff',
        text: '#1e293b',
        'text-muted': '#64748b',
        border: '#e2e8f0',
        error: '#ef4444',
      },
    },
  },
  plugins: [],
}
