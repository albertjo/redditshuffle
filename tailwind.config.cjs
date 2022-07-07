/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      maxHeight: theme => ({
        "screen-2/3": "66vh",
        "screen/2":   "50vh",
        "screen/3":   "calc(100vh / 3)",
      }),
    },
  },
  plugins: [],
}
