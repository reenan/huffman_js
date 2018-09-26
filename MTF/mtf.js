//
// Move-to-Front; MTF
// http://en.wikipedia.org/wiki/Move-to-front_transform
// http://www.geocities.jp/m_hiroi/light/pyalgo48.html
//

var _ = require('underscore');
var BWT = require('../BWT/bwt');

function MTF(){}

MTF.encode = function(data) {
  var table = _.range(256);
  var res = [];

  for (var i = 0; i < data.length; i++) {
    var code = data[i].charCodeAt();
    var idx = table.indexOf(code);
    res.push(idx);

    if (idx !== 0) {
      table.splice(idx, 1);
      table.unshift(code);
    }
  }

  return res;
};

MTF.decode = function(data) {
  var table = _.range(256);
  var res = [];

  for (var i = 0; i < data.length; i++) {
    var c = table[data[i]];

    if (data[i] > 0) {
      table.splice(data[i], 1);
      table.unshift(c);
    }

    res.push(String.fromCharCode(c));
  }

  return res.join('');
};

module.exports = MTF;

//
// var input, output, expect;
//
// input = 'abacadaeafagahaiajakalaman';
// var bwt = BWT.encode(input);
// console.log('input:', input);
// console.log('BWT encode:', bwt.data);
// output = MTF.encode(bwt.data);
//
// expect = [110, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// console.log('MTF encode:', output.toString());
// console.log(output.toString() === expect.toString() ? 'ok' : 'failed');
//
// output = MTF.decode(output);
// console.log('MTF decode:', output);
// console.log(output === bwt.data ? 'ok' : 'failed');
//
// output = BWT.decode(bwt.top, output);
// console.log('BWT decode:', output);
// console.log(output === input ? 'ok' : 'failed');