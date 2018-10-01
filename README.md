# Membros
Trabalho desenvolvido por [Renan Souza](https://github.com/reenan/), [Julio Renner](https://github.com/juliorenner) e [Lucas Schneider](https://github.com/schneiderl)
# huffman_js
O objetivo do presente é descrever a elaboração de uma solução computacional capaz de compactar e descompactar arquivos sem perda de informação durante o processo. Abaixo é descrito quais as decisões tomadas pelo algoritmo final e quais pipelines foram empregadas.


# Implementação

Foram implementados três diferentes algoritmos de compactação: Huffman, Método de Burrows-Wheeler e o algoritmo de Move To Front.
É notável a diferença entre taxas de compressão de acordo com a diferença na ordem da pipeline. A considerada mais satisfatória foi BWT -> MTF -> Huffman, que é capaz de codificar codificar grandes arquivos com uma melhor taxa de compressão.

Já para arquivos menores, notamos que a utilização de Huffman por si só se provou ser melhor do que a aplicação da pipeline utilizando os três algoritmos.

Visto que estamos desconsiderando fatores como utilização de recursos e tempo de compactação, optamos por aplicar ambas as pipelines aos arquivos disponibilizados e salvar apenas o menor deles, que então poderá ser descompactado. 


A lógica de definição das pipelines e save do arquivo gerado pelos algoritmos de compressão implementados pode ser encontrada no método ``compress()`` do arquivo ``index.js``.

Ao fim da execução, tivemos os seguintes resultados: 

| Arquivo       | Tamanho original (em bytes) | Tamanho após compressão (em bytes)|
| ------------- | --------------------------- | --------------------------------- |
| alice29.txt   |            152089           |                   130175          |
| sum           |            38240            |                   23303           |


Para fazer a execução do código, faça o clone do repositório e execute o arquivo ``index.js``. Ele procurará os arquivos alice29.txt e sum e criará quatro novos arquivos: alice_29_compressed.txt, alice_29_decompressed.txt, sum_compressed e sum_decompressed. 
