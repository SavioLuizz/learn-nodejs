/* 
   Usando o 'type: module' no json,posso usar o import/export.
   consigo diferenciar o que sao bibliotecas proprias do node ou de tercerios
   apenas colocando o nome 'node' na frente
*/

import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';
const database = new Database();

//Criando servidor
//passando como parametro uma arrow function
const server = http.createServer(async (req, res) => {

    /*  metodo de desestruturacao onde eu so preciso indicar 
        o que eu irei "pegar",nesse caso "method" e a "url"
    */
    const { method, url } = req;

    await json(req, res)

    /*Json é o obejto em JS onde vou guardar informaçoes do proprio
    No caso,o front nao aceita um array como resposta entao
    entao se usa Json.stringify para passar os user[] para string;
    */
    if (method == "GET" && url == "/users") {
        const users = database.select('users')

        return res.end(JSON.stringify(users))
    }

    // Criando usuários na mão...
    if (method == "POST" && url == "/users") {

        const { name, email } = req.body;
        //metodo .push é utilizado para adicionar valores a um array
        const user = {
            id: 1,
            name ,
            email
        }

        database.insert('users', user);

        //Estou passando o status code 201 = Alguma coisa foi criada com sucesso
        return res.writeHead(201).end();
    }

    return res.writeHead(404).end();
});

// quero que o meu servidor escute a porta localhost:3000
server.listen(3000);


