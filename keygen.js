const paseto = require('paseto')
const { V3 } = paseto 
async function x() {
let key = await V3.generateKey('local');
console.log(key.export().toString('hex'));
}
x();
