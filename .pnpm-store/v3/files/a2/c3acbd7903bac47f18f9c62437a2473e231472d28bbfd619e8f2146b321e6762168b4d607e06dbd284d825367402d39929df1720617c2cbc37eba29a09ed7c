'use strict';

var expect = require('chai').expect,
  isomorphicBase64 = require('./index');

describe('btoa', function () {
  it('encodes base64', function () {
    expect(isomorphicBase64.btoa('foobaz')).to.equal('Zm9vYmF6');
  });
});

describe('atob', function () {
  it('decodes base64', function () {
    expect(isomorphicBase64.atob('Zm9vYmF6')).to.equal('foobaz');
  });
});
