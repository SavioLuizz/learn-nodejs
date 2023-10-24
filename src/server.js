 /* 
    Usando o 'type: module' no json,posso usar o import/export.
    consigo diferenciar o que sao bibliotecas proprias do node ou de tercerios
    apenas colocando o nome 'node' na frente
*/

import http from 'node:http';

//Criando servidor
//passando como parametro uma arrow function
const server = http.createServer((req,res) => {
    res.end('Hello Word')

});

// quero que o meu servidor escute a porta localhost:3000
server.listen(3000);


