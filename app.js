// require module

var express = require('express'); // express 모듈 호출
var path = require('path');
var app = express(); // 생성자' 개념(constructor)
var bodyParser = require('body-parser');

// connect mysql

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'board'
});

connection.connect();

connection.query('SELECT * from user', function(err, rows){
  if(!err)
    console.log('The soultion is :' , rows);

  else
    console.log('Error while performing Query.', err);
});

//app.use(express.static(__dirname + '/public')); // 미들웨어 함수
//미들웨어란 서버에 도착한 신호는 router를 통해 어떤 응답을 할 지 결정하게 되는데, router전에 수행되는 명령어 'app.use()'를 통해 쓸 수 있음
// __dirname은 node에서 제공하는 node파일의 경로를 담고있는 변수

// model setting

app.set('view engine', 'ejs'); // express에게 view engine 사용 알림
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json()); // middle ware 함수, 모든 데이터들을 json으로 분석(즉 body에 있는 데이터들을 json(=text)로 분석)

// set routes

app.get('/posts', function(req, res){

  connection.query('SELECT * FROM post ORDER BY createAt DESC', function(err, post, fields){

    if(err) return res.json ({success:false, message:err});

    res.render("posts/index", {data:post});

  });
});

app.post('/posts', function(req, res){
  var body = req.body; // 전달된 값을 변수에 삽입

  connection.query('INSERT INTO post (num, title, body, userid, createAt) VALUES (?, ?, ?, ?, ?)',
  [body.num, body.title, body.body, body.userid, body.createAt],
  function(){
    res.redirect("/posts");
  });
}); // create data

app.get('/posts/:id', function(req, res){
  connection.query('SELECT num, title, body, userid, createAt FROM post', function(err, post, fields) {
    var num = req.params.num;
    var title = req.params.title;
    var body = req.params.body;
    var userid = req.params.userid;
    var createAt = req.params.createAt;

    if(err) return res.json({success:false, message:err});
    res.render("/posts/show", {data:post});

  });
});

app.put('/posts/:id', function(req, res){
  connection.query('SELECT * FROM post', function(err, post, fields) {

    if(id) {
      connection.query('UPDATE post SET createAt = NOW()')
    }

    if(err) return res.json({success:false, message:err});
    res.json({success:true, data:post});

  });
});

app.delete('/posts/:id', function(req, res){
  connection.query('DELETE FROM post WHERE id = ?', [req.params.id], function(){

    res.redirect("/posts");
  });

});

app.get('/', function(req, res){
   // '/' route 생성 후 get 신호를 전달받으면, 해당 파일 랜더링
});

app.listen(3000, function(){
  console.log('Server on!');
});
