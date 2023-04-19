var localeEmoji = require('.');

describe('localeEmoji', function() {
  var tests = {
    'de': '🇩🇪',
    'de-DE': '🇩🇪',
    'de_DE': '🇩🇪',
    'de-CH': '🇨🇭',
    'en': '🇺🇸',
    'EN': '🇺🇸',
    'en-GB': '🇬🇧',
    'en-US': '🇺🇸',
    'EN-US': '🇺🇸',
    'EN-us': '🇺🇸',
    'en-us': '🇺🇸',
    'pt': '🇧🇷',
    'sk_Latin_SK': '🇸🇰',
    'eo': '',
  };

  Object.keys(tests).forEach(function(from) {
    var to = tests[from];

    it(from + ' -> ' + to, function() {
      expect(localeEmoji(from)).toEqual(to);
    });
  });

  it('should return a empty string for invalid input', function() {
    expect(localeEmoji('potato')).toEqual('');
  });
});
