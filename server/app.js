// Importando módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

// Inicializando o aplicativo Express
const app = express();

// Adicionando o middleware do bodyParser
app.use(bodyParser.json());

// Definindo o banco de dados
let db;

// Função para inicializar o banco de dados
const initializeDb = async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  await db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      completed BOOLEAN
    )
  `);
};

// Recuperando todas as tarefas
app.get('/api/tasks', async (req, res) => {
  const tasks = await db.all('SELECT * FROM tasks');
  res.send(tasks);
});

// Adicionando uma nova tarefa
app.post('/api/tasks', async (req, res) => {
  const { description } = req.body;
  const { lastID } = await db.run('INSERT INTO tasks (description, completed) VALUES (?, 0)', description);
  const task = await db.get('SELECT * FROM tasks WHERE id = ?', lastID);
  res.send(task);
});

// Atualizando o status de uma tarefa
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  await db.run('UPDATE tasks SET completed = ? WHERE id = ?', completed, id);
  const task = await db.get('SELECT * FROM tasks WHERE id = ?', id);
  res.send(task);
});

// Excluindo uma tarefa
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await db.run('DELETE FROM tasks WHERE id = ?', id);
  res.send({ id });
});

// Inicializando o servidor
app.listen(5000, async () => {
  console.log('Servidor rodando na porta 5000');
  await initializeDb();
  console.log('Banco de dados inicializado');
});
