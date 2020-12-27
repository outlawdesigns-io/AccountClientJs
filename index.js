var mod =  (function(){
  const request = require('request');
  const host = 'https://api.outlawdesigns.io:9661';
  const userEnd = '/user';
  const locationEnd = '/location';

  let _authToken = 11111;

  function _authenticate(username,password){
    return new Promise((resolve,reject)=>{
      let options = {
        url:host + '/authenticate',
        headers:{
          request_token:username,
          password:password
        }
      };
      request(options,(err,res,body)=>{
        body = JSON.parse(body);
        if(!err && res.statusCode == 200 && !body['error']){
          _setToken(body.token);
          resolve(body);
        }else if(body['error']){
          reject(body.error);
        }else{
          reject(err);
        }
      });
    });
  }
  function _verifyToken(){
    return new Promise((resolve,reject)=>{
      let options = {
        url: host + '/verify',
        headers:{
          auth_token:_authToken
        }
      };
      request(options,(err,res,body)=>{
        body = JSON.parse(body);
        if(!err && res.statusCode == 200 && !body['error']){
          resolve(body);
        }else if(body['error']){
          reject(body.error);
        }else{
          reject(err);
        }
      });
    });
  }
  function _apiRequest(uri){
    return new Promise((resolve,reject)=>{
      let options = {
        url:host + '/' + uri,
        headers:{
          auth_token:_authToken
        }
      };
      request(options,(err,res,body)=>{
        body = JSON.parse(body);
        if(!err && res.statusCode == 200 && !body['error']){
          resolve(body);
        }else if(body['error']){
          reject(body.error);
        }else{
          reject(err);
        }
      });
    });
  }
  function _setToken(authToken){
    _authToken = authToken;
  }
  return{
    authToken:_authToken,
    authenticate:function(username,password){
      return _authenticate(username,password);
    },
    verifyToken:function(){
      return _verifyToken();
    },
    setToken:function(authToken){
      this.authToken = authToken;
      _setToken(authToken);
    },
    getUser:function(id){
      let uri = userEnd;
      if(id !== undefined){
        uri += '/' + id;
      }
      return _apiRequest(uri);
    },
    getLocation:function(id){
      let uri = locationEnd;
      if(id !== undefined){
        uri += '/' + id;
      }
      return _apiRequest(uri);
    },
    search:function(endpoint,key,value){
      let uri = endpoint + '/' + key + '/' + value;
      return _apiRequest(uri);
    },
    count:function(endpoint){
      let uri = endpoint + '/count';
      return _apiRequest(uri);
    },
    group:function(endpoint,key){
      let uri = endpoint + '/group/' + key;
      return _apiRequest(uri);
    }
  }

}());

module.exports = mod;
