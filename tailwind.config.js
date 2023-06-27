module.exports = {
  content: ['./app.vue'],
  theme: {
    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',

      blue: {
        DEFAULT: '#89c1cf',
        a: '#5194a7'
      },
      pink: {
        t: '#fed3c8',
        DEFAULT: '#f2beb1'
      },
      white: {
        DEFAULT: '#fefaf7',
        alt: '#efeaf1'
      }
    },
    extend: {
      boxShadow: {
        // Half Y offset
        'sm-1/2y': '0 0.5px 2px 0 rgb(0 0 0 / 0.05)',
        '1/2y': '0 0.5px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md-1/2y': '0 2px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg-1/2y': '0 5px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl-1/2y': '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl-1/2y': '0 14px 50px -12px rgb(0 0 0 / 0.25)',
        'inner-1/2y': 'inset 0 1px 4px 0 rgb(0 0 0 / 0.05)'
      }
    }
  }
}
