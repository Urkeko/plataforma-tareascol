import React, { useState, useEffect } from 'react';

const TaskModal = ({ task, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [date, setDate] = useState('');
    const [assignees, setAssignees] = useState([]);
    const [column, setColumn] = useState('planned'); // Campo para la columna/categoría
    const [users, setUsers] = useState(['AH', 'JD', 'KM']); // Lista de usuarios

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setTag(task.tag);
            setDate(task.date);
            setAssignees(task.assignees);
            setColumn(task.column);  // Establecer la categoría de la tarea al editar
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { 
            id: task ? task.id : Date.now(), 
            title, 
            description, 
            tag, 
            date, 
            assignees, 
            column  // Se guarda la categoría en la tarea
        };
        onSave(newTask);  // Llama a la función onSave con la tarea nueva o editada
        onClose();  // Cierra el modal después de guardar
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">{task ? 'Editar Tarea' : 'Crear Tarea'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Etiqueta</label>
                        <input
                            type="text"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Asignados</label>
                        <select
                            multiple
                            value={assignees}
                            onChange={(e) =>
                                setAssignees(
                                    Array.from(e.target.selectedOptions, (option) => option.value)
                                )
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            {users.map((user) => (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Categoría</label>
                        <select
                            value={column}
                            onChange={(e) => setColumn(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="planned">Planificada</option>
                            <option value="in-progress">En Progreso</option>
                            <option value="completed">Completada</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                        >
                            {task ? 'Guardar Cambios' : 'Crear Tarea'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
