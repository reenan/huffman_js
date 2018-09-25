class Node {
    constructor() {
        this.left = null
        this.right = null
        this.value = null
    }

    isLeaf() {
        return (this.left === this.right) && (this.right === null)
    }

    encode() {
        return this.value ? this.value : [this.left.encode(), this.right.encode()]
    }
}

module.exports = Node