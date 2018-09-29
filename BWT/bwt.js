const _ = require('underscore');

function BWT(){}

BWT.encode = function(data) {
    const size = data.length;
    const buff = data + data;
    const idx = _.range(size).sort(function(x, y){
        for (let i = 0; i < size; i++) {
            const r = buff[x + i].charCodeAt() - buff[y + i].charCodeAt();
            if (r !== 0) return r;
        }
        return 0;
    });
    
    let top;
    const work = _.reduce(_.range(size), function(memo, k){
        const p = idx[k];
        if (p === 0) top = k;
        memo.push(buff[p + size - 1]);
        return memo;
    }, []).join('');
    
    return { top: top, data: work };
};

BWT.decode = function(top, data) {
    const size = data.length;
    const idx = _.range(size).sort(function(x, y){
        const c = data[x].charCodeAt() - data[y].charCodeAt();
        if (c === 0) return x - y;
        return c;
    });
    
    let p = idx[top];
    return _.reduce(_.range(size), function(memo){
        memo.push(data[p]);
        p = idx[p];
        return memo;
    }, []).join('');
};

module.exports = BWT;