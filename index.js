const fs = require('fs')
const path = require('path')

const Huffman = require('./Huffman/Huffman')
const BWT = require('./BWT/bwt')
const MTF = require('./MTF/mtf')


go()

function go() {
    // Determina os arquivos que iremos compactar/descompactar
    let files = [
        { name: 'alice29', extension: '.txt', encoding: 'utf-8' },
        { name: 'sum', extension: '', encoding: 'binary' },
    ]

    // Loopa pelos arquivos para lê-los e criar o arquivo compactado.
    for (file of files) {
        fs.readFile(
            path.join(__dirname, 'resources', file.name + file.extension),
            file.encoding,
            createCompressedFile.bind(this, file)
        )
    }
}

// Compacta o arquivo e cria a versão compactada na pasta.
function createCompressedFile(file, err, fileData) {
    if (err) {
        console.log(err)
        return
    }

    // Se o arquivo for do tipo binário, então primeiro desconverte o buffer.
    if (file.encoding == 'binary')
        fileData = fileData.toString('binary')

    // Compacta o arquivo
    const compressedData = compress(fileData)
    const compressed = compressedData.encoded 

    // Cria o arquivo compactado
    fs.writeFile(
        path.join(__dirname, 'resources', file.name + '_compressed' + file.extension),
        compressed,
        file.encoding,
        createDecompressedFile.bind(this, file, compressedData)
    )
}

// Descompacta o arquivo e remonta ele na pasta.
function createDecompressedFile(file, compressedData) {
    let decompressed = decompress(compressedData)

    // Se for binário, tem que converter para o buffer
    if (file.encoding == 'binary')
        decompressed = Buffer.from(decompressed, 'binary')

    fs.writeFile(
        path.join(__dirname, 'resources', file.name + '_decompressed' + file.extension),
        decompressed,
        file.encoding,
        // Se for binário, tem que setar o chmod para ser executável
        () => { 
            if (file.encoding == 'binary')  
                fs.chmod('./resources/sum_decompressed', '755', () => console.log('chmod applied')) 
        }
    )
}

// Executa descompactação de dados
function decompress({ huffmanTree, BWTTop, encoded, pipeline }) {
    let decoded = encoded
    
    // Loopa pela pipeline, decodando de acordo com cada algoritmo utilizado
    for (let i = 0; i < pipeline.length; i ++) {
        switch (pipeline[i]) {
            case 'BWT':
            decoded = BWT.decode(BWTTop, decoded)
            break
            
            case 'MTF':
            decoded = MTF.decode(decoded.split(','))
            break
            
            case 'Huffman':
            decoded = huffmanTree.decode(decoded)
            break
        }
    }
    
    return decoded
    
}

// Codifica os dados considerando duas pipelines, retorna o melhor resultado
function compress(data) {
    const pipeline1 = ['BWT', 'MTF', 'Huffman']
    const pipeline2 = ['Huffman']
    
    const data1 = compressPipeline(pipeline1, data)
    const data2 = compressPipeline(pipeline2, data)
    
    return ( 
        data1.encoded.length < data2.encoded.length ?
            data1 : data2
    )
}

// Executa a codificação de dados utilizando uma pipeline
function compressPipeline(pipeline, data) {
    let encoded = data
    let BWTTop = null
    let huffmanTree = null
   
    // Compacta de acordo com cada algoritmo utilizado
    for (let i = 0; i < pipeline.length; i ++) {
        switch (pipeline[i]) {
            case 'BWT':
            let bwtEncode = BWT.encode(encoded)
            encoded =  bwtEncode.data
            BWTTop = bwtEncode.top
            break
            
            case 'MTF':
            encoded = MTF.encode(encoded).toString()
            break
            
            case 'Huffman':
            huffmanTree = new Huffman(encoded)
            encoded = huffmanTree.encode(encoded)
            break
        }
    }
    
    return {
        huffmanTree,
        BWTTop,
        encoded,
        pipeline: pipeline.slice(0).reverse()
    } 
}
