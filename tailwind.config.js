/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        green1: "#86efac",
        green: "#039855",
        greenDark: "#027a48",
        greenSoft: "#ecfdf3",

        light: "#ecf3ff",
        dark: "#d1fadf",

        gray: "#f3f4f6",
        gray1: "#f2f4f7",
        gray2: "#d0d5dd",
        gray3: "#f9fafb",

        text: "#667085",
        color1: "#e4e7ec",
        color2: "#475467",

        hover: "#3641f5",

        red1: "#d92d20",
        red2: "#fef3f2",

        blue: "#3788d8",
      },
        screens:{
      sm:"150px",
      md:"768px",
      lg:"1024px",
      xl:"1280px",
      "2xl":"1536px",
    },
    },
  },
  plugins: [],
}

