import { Readable } from 'node:stream';

    class OnetoHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;
        setTimeout(() => {
            if(i > 5){
                this.push(null)
            } else {
                const buf = Buffer.from(String(i + " "));
                this.push(buf);
            }
        }, 1000);
     }
}

// fetch() serve para fazer requisiçoes tanto de front para back 
// ou de um back para outro back.
fetch('http://localhost:3001', {
    method: 'POST',
    body: new OnetoHundredStream(),
    duplex: 'half'
}).then(response =>{
    return response.text()
}).then(data => {
    console.log(data)
})
