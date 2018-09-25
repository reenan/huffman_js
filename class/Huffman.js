const TreeBuilder = require('./TreeBuilder')

class Huffman {
    constructor(text) {
        let treeBuilder = new TreeBuilder(text);
        return treeBuilder.build()
    }
}

module.exports = Huffman