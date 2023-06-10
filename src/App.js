/*
Em resumo, este arquivo define um componente React que gerencia uma 
lista de tarefas. Ele permite ao usuário adicionar tarefas, marcar 
tarefas como concluídas e excluir tarefas. Todas as alterações são 
sincronizadas com o servidor através de uma API REST.
*/
 
// Importando módulos necessários
import React, { useState, useEffect } from 'react';
import './App.css';

// Componente principal
function App() {
  // Criando estado para tarefas e descrição de nova tarefa
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Recuperando as tarefas ao carregar o componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Função para recuperar tarefas do servidor
  const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  // Função para adicionar uma nova tarefa
  const addTask = async () => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: newTaskDescription }),
    });
    const data = await response.json();
    setTasks([...tasks, data]);
    setNewTaskDescription('');
  };

  // Função para marcar uma tarefa como concluída
  const toggleTask = async (id, currentStatus) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !currentStatus }),
    });
    const data = await response.json();
    setTasks(tasks.map((task) => (task.id === id ? data : task)));
  };

  // Função para excluir uma tarefa
  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Renderizando a interface do usuário
  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={addTask}>Adicionar</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id, task.completed)}
            />
            {task.description}
            <button onClick={() => deleteTask(task.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Exportando o componente
export default App;
