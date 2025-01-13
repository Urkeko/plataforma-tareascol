import express from 'express';
import { createConnection } from 'mysql';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de bd
const DB = createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tareascol',
  port: process.env.DB_PORT || 3306,
});

DB.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.message);
    process.exit(1);
  }
  console.log('Conexión exitosa a la base de datos!');
});


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Endpoint: Inicio de sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
  }
  const query = 'SELECT id, email, password FROM users WHERE email = ?';
  DB.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  
    // Verificacion de Usuario 
    if (results.length > 0) {
      const user = results[0]; 
  
      
      if (password === user.password) {
        // Toke de autenticación
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' },
        );
  
        return res.status(200).json({
          message: 'Login exitoso',
          token,
          user: { id: user.id, email: user.email },
        });
      } else {
        
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    } else {
      
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
  
});

// Endpoint: Verificar autenticación
app.get('/api/logue', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({ isAuthenticated: false });
    }
    return res.status(200).json({ isAuthenticated: true });
  });
});

// Endpoint para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
  
    // Validar que los campos no estén vacíos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
    }
  
    // Verificar si el correo ya está registrado
    const queryCheck = 'SELECT * FROM users WHERE email = ?';
    DB.query(queryCheck, [email], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error en la base de datos' });
      }
  
      if (results.length > 0) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
      }
  
      // Insertar el nuevo usuario en la base de datos 
      const queryInsert = 'INSERT INTO users (email, password) VALUES (?, ?)';
      DB.query(queryInsert, [email, password], (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
  
        
        return res.status(201).json({ message: 'Usuario registrado exitosamente' });
      });
    });
  });
  
// Servidor 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
