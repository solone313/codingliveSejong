const fetch = require('node-fetch');

fetch("http://localhost:3000").then(result=>{
    console.log(result);
});