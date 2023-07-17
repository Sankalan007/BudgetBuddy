/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      // solid colors
      red:"#FF0000",
      green:"#008000",
      blue:"#0000FF",
      yellow:"#FFFF00",
      orange:"#ffa500",
      navy:"#000080",
      teal:"#008080",
      aqua:"#00FFFF",
      lime:"#00FF00",
      purple:"#800080",
      fuchsia:"#FF00FF",
      maroon:"#800000",
      olive:"#808000",
      white:"#FFFFFF",
      black:"#000000",
      gray:"#808080",
      silver:"#C0C0C0",
      brown: "#3F2229",

      // colors by importance
      safe:"#1fa349",
      "safe-deep": "#1f9c3c",
      info: "#1c89d6",
      warning: "#dbbd14",
      danger: "#c23013",

      // light mode colors
      primary: "#ffffff",
      secondary: "#808080",
      text: "#000000",
      "primary-active-tab": "#858888",
      "primary-black": "#000000",
      "primary-gray": "#73706f",

      // dark mode colors
      "dark-primary": "#1f3164",
      "dark-secondary": "#121d3b",
      "dark-text": "#ffffff",
      "dark-active-tab": "#3f63c6",

      // miscellanous colors
      "primary-bg": "#081824",
      "logo-green-500": "#1cb33a",
      "avatar-border": "#ffffff",
    },
    extend: {
      fontFamily: {
        handdrawn: "'Delicious Handrawn', cursive",
        merriweather: "'Merriweather', serif",
        maven: "'Maven Pro', sans-serif",
        yanone: "'Yanone Kaffeesatz', sans-serif",
        cormorant: "'Cormorant Garamond', serif",
        roboto: "'Roboto Condensed', sans-serif",
      },
      keyframes: {
        flipHorizontal: {
          "50%": { transform: "rotateY(180deg)" },
        },
        rotation: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        rubberband: {
          from: {
            transform: "scale3d(1, 1, 1)",
          },
          "30%": {
            transform: "scale3d(1.25, 0.75, 1)",
          },
          "40%": {
            transform: "scale3d(0.75, 1.25, 1)",
          },
          "50%": {
            transform: "scale3d(1.15, 0.85, 1)",
          },
          "65%": {
            transform: "scale3d(0.95, 1.05, 1)",
          },
          "75%": {
            transform: "scale3d(1.05, 0.95, 1)",
          },
          to: {
            transform: "scale3d(1, 1, 1)",
          },
        },
      },
      animation: {
        hflip: "flipHorizontal 2s",
        rotation: "rotation 2s",
        rubberband: "rubberband 2s",
      },
    },
  },
  plugins: [],
};
