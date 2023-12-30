const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ambersoft'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
    connection.query('SELECT * FROM cargos', (error, resultsCargos) => {
        if (error) throw error;

        connection.query('SELECT pessoas.nome, pessoas.idade, pessoas.salario, cargos.nome_cargo FROM pessoas INNER JOIN cargos ON pessoas.idCargo = cargos.idCargo', (error, resultsPessoas) => {
            if (error) throw error;

            res.render('index', { cargos: resultsCargos, pessoas: resultsPessoas });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
