/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      left: {
        "1/10": "10%",
      },
      boxShadow: {
        normal: "0 0px 10px 2px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
      },
      gridTemplateColumns: {
        normal: "40% 60%",
        mobile: "repeat(100%)",
      },
      maxWidth: {
        reading: "700px",
      },
      minWidth: {
        dropdown: "300px",
      },
      maxHeight: {
        "8/10vh": "80vh",
      },
    },
  },
  plugins: [],
};
