// tailwind.config.js
const tail = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // reuse as 'bg-custom-gradient'
        'custom-gradient': "linear-gradient(90deg, rgba(189,127,47,1) 0%, rgba(201,192,107,1) 50%, rgba(237,221,83,0.91) 100%)",
      },
    },
  },
  plugins: [],
}

export default tail;