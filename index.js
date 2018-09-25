let Huffman = require('./class/Huffman')

let lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.'

let huffmanTree = new Huffman(lorem)

let encoded = huffmanTree.encode(lorem)
let decoded = huffmanTree.decode(encoded)

console.log(lorem)
console.log(encoded)
console.log(decoded)
