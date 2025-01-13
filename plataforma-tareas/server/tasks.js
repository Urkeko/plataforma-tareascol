const express = require('express');
const mysql = require('mysql2/promise'); 
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const dbConfig = {
  host: 'localhost', 
  user: 'root',
  password: 'password',
  database: 'task_management',
};


app.post('/api/tasks', async (req, res) => {
  const { title, description, tag, due_date, column } = req.body;

  try {
    
    const connection = await mysql.createConnection(dbConfig);

    // Consulta para insertar una nueva tarea
    const query = `
      INSERT INTO tasks (title, description, tag, due_date, column)
      VALUES (?, ?, ?, ?, ?)
    `;

   
    const [result] = await connection.execute(query, [
      title,
      description,
      tag,
      due_date,
      column,
    ]);

    // Cerrar la conexión
    await connection.end();

    
    res.status(201).json({
      id: result.insertId,
      title,
      description,
      tag,
      due_date,
      column,
    });
  } catch (error) {
    console.error('Error al insertar tarea:', error);
    res.status(500).json({ error: 'Error al insertar la tarea en la base de datos' });
  }
});

// Servidor 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
