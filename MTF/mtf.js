const _ = require('underscore');
const BWT = require('../BWT/bwt');

function MTF(){}

MTF.encode = function(data) {
    const table = _.range(256);
    const res = [];
    
    for (let i = 0; i < data.length; i++) {
        const code = data[i].charCodeAt();
        const idx = table.indexOf(code);
        res.push(idx);
        
        if (idx !== 0) {
            table.splice(idx, 1);
            table.unshift(code);
        }
    }
    
    return res;
};

MTF.decode = function(data) {
    const table = _.range(256);
    const res = [];
    
    for (let i = 0; i < data.length; i++) {
        const c = table[data[i]];
        
        if (data[i] > 0) {
            table.splice(data[i], 1);
            table.unshift(c);
        }
        
        res.push(String.fromCharCode(c));
    }
    
    return res.join('');
};

module.exports = MTF;