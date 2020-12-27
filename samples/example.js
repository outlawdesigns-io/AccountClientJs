const client = require('./Client');
const fs = require('fs');
const global.config = require('./config');
const tokenFile = 'token.json';

function renewToken(){
  client.authenticate(global.config.username,global.config.password).then((data)=>{
    fs.writeFile('token.json',JSON.stringify(data),(err)=>{
      if(err) throw err;
    })
  },console.error);
}
function readToken(){
  if(fs.existsSync(tokenFile)){
    let data = JSON.parse(fs.readFileSync(tokenFile));
    client.setToken(data.token);
  }else{
    renewToken();
  }
}

readToken();
client.verifyToken().then((data)=>{
  //token is still good | add your test code here
  client.getUser(2).then(console.log,console.error);
},(err)=>{
  renewToken();
  console.log('Token renewed. Please try again.');
});
