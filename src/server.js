/* 
   Usando o 'type: module' no json,posso usar o import/export.
   consigo diferenciar o que sao bibliotecas proprias do node ou de tercerios
   apenas colocando o nome 'node' na frente
*/

import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

//Criando servidor
//passando como parametro uma arrow function
const server = http.createServer(async (req, res) => {

    /*  metodo de desestruturacao onde eu so preciso indicar 
        o que eu irei "pegar",nesse caso "method" e a "url"
    */
    const { method, url } = req;

    await json(req, res)

    const route = routes.find(route =>{
        return route.method == method && route.path.test(url)
    })

    if(route){
        const routeParams = req.url.match(route.path)

        const {query, ... params} = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}
        
        return route.handler(req, res)
    }

    return res.writeHead(404).end();
});

// quero que o meu servidor escute a porta localhost:3000
server.listen(3003);


