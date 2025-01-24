document.addEventListener('DOMContentLoaded', function () {
  try {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isSafari) {
      const imageUrl = window.location.origin + '/you-are-the-best.webp';
      console.log(
        '%cStop!',
        'color:#0a192f;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px #64ffda;font-weight:bold'
      );
      const css = `padding:200px 0 0 0;text-align:bottom;font-size: 1.5rem;background:url(${imageUrl}) no-repeat left top;background-size:200px`;
      console.log("%c So, you're reading the console messages - how geeky! 🤓", css);
    }
  } catch (error) {
    console.error('❌ Error in geeky-console.js: ', error);
  }
});
