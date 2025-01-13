import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2'; // O el cliente de base de datos que estés utilizando
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Ruta para login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Buscar usuario en la base de datos por email
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];

    // Verificar la contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error al verificar la contraseña' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      // Crear el token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,  // Clave secreta del token
        { expiresIn: '1h' }     // El token expira en 1 hora
      );

      // Devolver el token en la respuesta
      return res.status(200).json({ token });
    });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Recuperar contraseña 

app.post('/recuperar-contrasena', (req, res) => {
  const { email } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
      if (err) {
          return res.status(500).json({ message: 'Error en la base de datos' });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const user = results[0];

      // Generar un token de recuperación (en este caso, solo un ejemplo de un token ficticio)
      const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Configurar el transporte de correo
      const transporter = nodemailer.createTransport({
          service: 'gmail', // O el servicio de tu elección
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
          },
      });

      // Configurar el contenido del correo
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: 'Recuperación de Contraseña',
          text: `Haz clic en el siguiente enlace para recuperar tu contraseña: 
          ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
      };

      // Enviar el correo
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return res.status(500).json({ message: 'Error al enviar el correo' });
          }
          res.status(200).json({ message: 'Correo de recuperación enviado' });
      });
  });
});




// Ruta para el registro de usuario
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Verifica si ya existe un usuario con ese correo
  const existingUser = await User.findOne({ email });
  if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear un nuevo usuario
  const newUser = new User({
      username,
      email,
      password: hashedPassword,
  });

  try {
      // Guardar el nuevo usuario en la base de datos
      await newUser.save();

      // Generar un token JWT para la sesión
      const token = jwt.sign({ userId: newUser._id }, 'mi_secreto', { expiresIn: '1h' });

      // Devolver la respuesta con el token
      res.status(201).json({ message: 'Usuario registrado exitosamente', token });
  } catch (error) {
      res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
});

// Escucha en el puerto adecuado
app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});



app.post('/recuperar-contrasena', (req, res) => {
    const { email } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la base de datos' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];

        // Generar un token de recuperación (en este caso, solo un ejemplo de un token ficticio)
        const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Configurar el transporte de correo
        const transporter = nodemailer.createTransport({
            service: 'gmail', // O el servicio de tu elección
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Configurar el contenido del correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Recuperación de Contraseña',
            text: `Haz clic en el siguiente enlace para recuperar tu contraseña: 
            ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
        };

        // Enviar el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error al enviar el correo' });
            }
            res.status(200).json({ message: 'Correo de recuperación enviado' });
        });
    });
});