var tapListener = require('..');
var count = 0;
var docTapListener;

document.getElementById('init').addEventListener('click', function(e) {
  e.stopPropagation();
  if (docTapListener) return;
  docTapListener = true;
  docTapListener = tapListener(document.documentElement, registerTap);
});

document.getElementById('remove').addEventListener('click', function(e) {
  e.stopPropagation();
  if (docTapListener) docTapListener.remove();
  docTapListener = null;
});

function registerTap(e) {
  console.log(e.type);
  count++;
  document.getElementById('count').innerHTML = count;
}
