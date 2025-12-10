export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#e6ecff",
          200: "#c6d1ff",
          300: "#9fb2ff",
          400: "#7b92ff",
          500: "#5a73ff",
          600: "#4758e6",
          700: "#3742b3",
          800: "#27307f",
          900: "#161a4d"
        },
        accent: {
          100: "#fff6ea",
          200: "#ffecd0",
          400: "#ffd08a",
          600: "#ffb33b"
        }
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
        body: ["Inter", "system-ui", "Segoe UI", "Arial"]
      },
      boxShadow: {
        'card-lg': '0 10px 30px rgba(17,24,39,0.15)'
      },
      borderRadius: {
        'xl': '1rem'
      }
    }
  },
  plugins: []
};
