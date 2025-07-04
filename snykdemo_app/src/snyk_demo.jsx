const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQLの接続設定
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

connection.connect();

// ユーザー名でユーザー情報を検索するエンドポイント
app.get('/user', (req, res) => {
  const username = req.query.username;

  // 🚨 脆弱なSQLクエリ（SQLインジェクションのリスク）
  const query = `SELECT * FROM users WHERE username = '${username}'`;

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send('Database error');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
