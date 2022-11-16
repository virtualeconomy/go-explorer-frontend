module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 1920 / 10,
        unitPrecision: 5,
        propList: ["*"],
        selectorBlackList: [/^\.html/],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0
      }
  
    }
  }
  