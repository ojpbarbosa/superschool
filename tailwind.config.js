module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extends: {
      colors: {
        black: '#111111',
        blue: '#1F9CE0'
      }
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      'ibm-plex-serif': ['IBM Plex Serif', 'serif'],
      'ibm-plex-sans': ['IBM Plex Sans', 'sans-serif'],
      'ibm-plex-mono': ['IBM Plex Mono', 'mono']
    }
  }
}
