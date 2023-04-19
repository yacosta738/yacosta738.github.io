var isProduction = process.env.NODE_ENV === 'production';
var index = (function (condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }

    console.warn(message);
  }
});

export default index;
