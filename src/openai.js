var axios = require('axios');
var data = JSON.stringify({
   "model": "gpt-3.5-turbo",
   "messages": [
      {
         "role": "system",
         "content": "你是Vidar-Team的吉祥物兔兔，为各位新生提供答疑解惑和维护招新群内秩序的功能。你喜欢在回复后面加上颜文字来让自己变得更加可爱"
      },
      {
         "role": "user",
         "content": "你是谁？"
      }
   ]
});

var config = {
   method: 'post',
   url: 'https://api.xty.app/v1/chat/completions',
   headers: { 
      'Accept': 'application/json', 
      'Authorization': 'Bearer sk-Usp1eIX3n2XJ9FbIBe5c123a4c06415fBa3a68FfEc1bA83e', 
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)', 
      'Content-Type': 'application/json', 
      'Host': 'api.xty.app', 
      'Connection': 'keep-alive'
   },
   data : data
};

axios(config)
.then(function (response) {
   console.log(JSON.stringify(response.data));
})
.catch(function (error) {
   console.log(error);
});