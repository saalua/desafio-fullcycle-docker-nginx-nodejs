const express = require('express');
const app = express();

const PORT = 3000;

const config = {
  host   : 'db',
  user   :  'root',
  password : 'root',
  database : 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const INSERT_NAME_SQL = `INSERT INTO people(name) VALUES('Luana'), ('Luna'), ('Miguel'), ('João'), ('Samuel')`;
const SELECT_NAMES_SQL = `SELECT name FROM people`;
const CREATE_TABLE_SQL = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id))`;


app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  connection.query(CREATE_TABLE_SQL);
  connection.query(INSERT_NAME_SQL);
});


app.get('/', async (req, res) => {
    connection.query(SELECT_NAMES_SQL, (error, results) => {
        if (error) {
            throw error;
        }

        const namesList = results.map((result) => result.name);

        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <ul>${namesList.map((name) => `<li>${name}</li>`).join('')}</ul>
        `);
    });
});