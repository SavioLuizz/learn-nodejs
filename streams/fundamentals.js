/*
Stream -> nao preciso pegar o arquivo todo so para depois começar 
a utilizado. Como um exemplo,quero meu usuário quer me mandar um arquivo de 1gb
com as streams,nao preciso baixar o arquivo todo para começar a utiliza-lo.
*/
//Aqui estou fazendo justamente isso com o pipe().
//process.stdin.pipe(process.stdout);

//Criando uma stream do 0

import {Readable, Writable, Transform} from 'node:stream';

    class OnetoHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;
        setTimeout(() => {
            if(i > 100){
                this.push(null)
            } else {
                const buf = Buffer.from(String(i + " "));
                this.push(buf);
            }
        }, 1000);
    }
}

    class InverseNumberStream extends Transform {
        _transform(chunk, encoding, callback){
            const transform = Number(chunk.toString()) * -1;

            callback(null,Buffer.from(String(transform)));
        }

    }

    class MultiplyByTenStream extends Writable {
        _write(chunk, encoding, callback) {
            console.log(Number(chunk.toString()) * 10);
            callback();
        }
    }

new OnetoHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream());