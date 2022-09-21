/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./layouts/**/*.html", "./archtypes/*.md"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
