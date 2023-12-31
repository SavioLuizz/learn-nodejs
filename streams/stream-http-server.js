import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed)
        callback(null,Buffer.from(String(transformed)));
    }

}

// req => ReadableStream
// ser => Writeablestream

const server = http.createServer(async(req,res)=>{
    const buffers = [];

    for await(const chunk of req) {
        buffers.push(chunk);
    }
    const fullbody = Buffer.concat(buffers).toString()

    console.log(fullbody);
    return res.end(fullbody);

});

server.listen(3001);