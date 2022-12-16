/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    screens: {
      sm: '480px', //mobile
      md: '768px', //tablets
      lg: '976px', //pc
      xl: '1440px' //large pc
    },
    extend: {
      colors: {
        darkBlue: '#33789E',
        lightBlue: '#579FCA',
        darkGray: '#8F9DAA',
        lightGray: '#CED2D3',
      }
    },
  },
  plugins: [],
}
