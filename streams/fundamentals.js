// Stream -> 

// process.stdin
//     .pipe(process.stdout)

import { Readable, Writable, Transform, Duplex } from 'node:stream'

class OneToHundreadStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buffer = Buffer.from(String(i))

                this.push(buffer)
            }
        }, 1000)
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}



// new OneToHundreadStream()
//     .pipe(process.stdout)

// new OneToHundreadStream()
//     .pipe(new MultiplyByTenStream())

new OneToHundreadStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())