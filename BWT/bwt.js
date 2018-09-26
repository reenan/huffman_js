//
// Burrows-Wheeler Transform; BWT
// http://en.wikipedia.org/wiki/Burrows%E2%80%93Wheeler_transform
// http://www.geocities.jp/m_hiroi/light/pyalgo48.html
//

var _ = require('underscore');

function BWT(){}

BWT.encode = function(data) {
  var size = data.length;
  var buff = data + data;
  var idx = _.range(size).sort(function(x, y){
    for (var i = 0; i < size; i++) {
      var r = buff[x + i].charCodeAt() - buff[y + i].charCodeAt();
      if (r !== 0) return r;
    }
    return 0;
  });

  var top;
  var work = _.reduce(_.range(size), function(memo, k){
    var p = idx[k];
    if (p === 0) top = k;
    memo.push(buff[p + size - 1]);
    return memo;
  }, []).join('');

  return { top: top, data: work };
};

BWT.decode = function(top, data) {
  var size = data.length;
  var idx = _.range(size).sort(function(x, y){
    var c = data[x].charCodeAt() - data[y].charCodeAt();
    if (c === 0) return x - y;
    return c;
  });

  var p = idx[top];
  return _.reduce(_.range(size), function(memo){
    memo.push(data[p]);
    p = idx[p];
    return memo;
  }, []).join('');
};

module.exports = BWT;

// var input = 'abacadaeafagahaiajakalaman';
// console.log(input);
//
// var o = encode(input);
// console.log(o);
// console.log(o.data === 'nbcdefghijklmaaaaaaaaaaaaa' ? 'true' : 'false');
//
// var o = decode(o.top, o.data);
// console.log(o);
// console.log(o === input ? 'true' : 'false');