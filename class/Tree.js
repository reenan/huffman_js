const Node = require('./Node')
const Helper = require('./Helper')

class Tree {
    constructor(node) {
        this.root = node || new Node()
    }

    encode(text) {
        return this.bitStringToString(this.encodeBitString(text))
    }

    decode(text) {
        let bitString = this.stringToBitString(text)
        let decoded = ''
        
        let node = this.root
        
        for (let i = 0; i < bitString.length; i++) {
            node = node[bitString.charAt(i) === '0' ? 'left' : 'right']
            
            if (node.isLeaf()) {
                decoded += node.value
                node = this.root
            }
        }
        return decoded
    }

    encodeBitString(bitString) {
        let encoded = ''

        for (let i = 0; i < bitString.length; i++) {
            encoded += this.bitValue(bitString.charAt(i))
        }

        return encoded
    }

    bitStringToString(bitString) {
        let encoded = ''
        
        let padByte = 8 - bitString.length % 8
        bitString += '0'.repeat(padByte)

        for (let i = 0; i < bitString.length; i += 8) {
            encoded += String.fromCharCode(parseInt(bitString.substr(i, 8), 2))
        }

        return encoded + padByte.toString()
    } 
    
    stringToBitString(bitString) {
        let pieces = bitString.split('')
        let pad = parseInt(pieces.pop())
        
        let paddedPieces = pieces.reduce((current, chr, i, pieces) => {
            current.push(Helper.prototype.lpad(chr.charCodeAt(0).toString(2)))
            return current
        }, [])

        paddedPieces = paddedPieces.join('')
        return paddedPieces.substr(0, paddedPieces.length - pad)
    }

    bitValue(chr) {
        if (!(this.leafCache !== undefined && this.leafCache !== null)) {
            this.generateLeafCache()
        }

        return this.leafCache[chr]
    }

    generateLeafCache(node, path) {
        if (!(this.leafCache !== undefined && this.leafCache !== null)) {
            this.leafCache = {}
        }

        node = node || this.root
        path = path || ''

        if (node.isLeaf()) {
            this.leafCache[node.value] = path
            return path
        } else {
            this.generateLeafCache(node.left, path + '0');
            return this.generateLeafCache(node.right, path + '1')
        }
    }

    encodeTree() {
        return this.root.encode()
    }
}

Tree.decodeTree = function(data) {
    return new Tree(Tree.parseNode(data))
}

Tree.parseNode = function(data) {
    var node = new Node()

    if (Array.isArray(data)) {
        node.left = Tree.parseNode(data[0])
        node.right = Tree.parseNode(data[1])
    } else {
        node.value = data
    }
    return node
}

module.exports = Tree