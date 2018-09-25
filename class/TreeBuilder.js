const Tree = require('./Tree')

class TreeBuilder {
    constructor(text) {
        this.text = text
    }

    build() {
        let frequencyTable = this.buildFrequencyTable()
        let combinedList = this.combineTable(frequencyTable);
        return Tree.decodeTree(this.compressCombinedTable(combinedList))
    }

    buildFrequencyTable() {
        let tableHash = {}

        let chr;
        for (let i = 0; i < this.text.length; i ++) {
            chr = this.text.charAt(i)
            if (tableHash[chr] !== undefined && tableHash[0] !== null) {
                tableHash[chr]++
            } else {
                tableHash[chr] = 0
            }
        }


        let table = []
        
        for (chr in tableHash) {
            table.push([tableHash[chr], chr])
        }

        table.sort(this.frequencySorter);
        return table
    }

    frequencySorter(frequencyA, frequencyaB) {
        return frequencyA[0] > frequencyaB[0] ? 
            1 : (frequencyA[0] < frequencyaB[0] ? -1 : 0)
    }

    combineTable(table) {
        let first
        let second

        while (table.length > 1) {
            first = table.shift()
            second = table.shift()

            table.push([
                first[0] + second[0],
                [first, second]
            ])

            table.sort(this.frequencySorter)
        }
        return table[0]
    }

    compressCombinedTable(table) {
        let value = table[1];
        return Array.isArray(value) ? 
            [this.compressCombinedTable(value[0]), this.compressCombinedTable(value[1])] : value
    }
}

module.exports = TreeBuilder