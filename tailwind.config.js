/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    container: {
      padding: '1rem',
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}