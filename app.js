var express = require('express'); // express 모듈 호출

var app = express(); // 생성자' 개념(constructor)

app.get('/',function (req,res) { // 두개의 arguments 1: 조건 2: 반응 함수
  res.send('hellow world!');
});

app.listen(3000, function(){
  console.log('Server on!');
});
