/* 
   Usando o 'type: module' no json,posso usar o import/export.
   consigo diferenciar o que sao bibliotecas proprias do node ou de tercerios
   apenas colocando o nome 'node' na frente
*/

import http from 'node:http';
const users = [];

//Criando servidor
//passando como parametro uma arrow function
const server = http.createServer((req, res) => {

    /*  metodo de desestruturacao onde eu so preciso indicar 
        o que eu irei "pegar",nesse caso "method" e a "url"
    */
    const { method, url } = req;

    /*Json é o obejto em JS onde vou guardar informaçoes do proprio
    No caso,o front nao aceita um array como resposta entao
    entao se usa Json.stringify para passar os user[] para string;
    */
    if (method == "GET" && url == "/users") {
        return res.end(JSON.stringify(users));
    }

    // Criando usuários na mão...
    if (method == "POST" && url == "/users") {
        //metodo .push é utilizado para adicionar valores a um array
        users.push({
            id: 1,
            name: "savio",
            email: "savioluizgmail.com"
        });
        //Estou passando o status code 201 = Alguma coisa foi criada com sucesso
        return res.writeHead(201).end();
    }

    return res.writeHead(404).end();
});

// quero que o meu servidor escute a porta localhost:3000
server.listen(3000);


