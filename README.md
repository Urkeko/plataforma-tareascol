Instrucciones para instalar y correr el proyecto
Clonar el repositorio:

bash
Copiar código
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>

Configurar la base de datos:

Crea una base de datos en phpMyAdmin, importa el archivo SQL (en db) y ajusta las credenciales en el archivo .env del backend.
Correr el proyecto 
Tecnologías utilizadas
Frontend: Vite + React.
Backend: Node.js + Express.
Base de datos: MySQL + phpMyAdmin.
Conexión: Axios para integrar frontend y backend.
Endpoints
POST /api/tasks: Crea una nueva tarea.
GET /api/tasks: Obtiene todas las tareas.
PUT /api/tasks/:id: Actualiza una tarea.
DELETE /api/tasks/:id: Elimina una tarea.
