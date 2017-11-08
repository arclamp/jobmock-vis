import smallData from '../data/jobmock-small.json';

console.log('hello, world');
document.write(`<h1>hello, world</h1><pre>${JSON.stringify(smallData, null, 2)}</pre>`);
