import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';

const TaskBoard = () => {
  const [columns, setColumns] = useState({
    planned: { title: 'Planificada', tasks: [] },
    inProgress: { title: 'En Progreso', tasks: [] },
    inReview: { title: 'En revision', tasks: [] },
    completed: { title: 'Completada', tasks: [] },
  });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    tag: '',
    date: '',
    assignees: [],
    column: 'planned',
  });

  const [users, setUsers] = useState(['AH', 'JD', 'KM']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetTaskForm();
  };

  const resetTaskForm = () => {
    setNewTask({
      title: '',
      description: '',
      tag: '',
      date: '',
      assignees: [],
      column: 'planned',
    });
    setEditingTask(null);
  };

  const addTask = () => {
    const task = { ...newTask, id: Date.now() };
    setColumns((prev) => ({
      ...prev,
      [newTask.column]: {
        ...prev[newTask.column],
        tasks: [...prev[newTask.column].tasks, task],
      },
    }));
    closeModal();
  };

  const editTask = () => {
    const updatedColumns = { ...columns };
    
    updatedColumns[editingTask.column].tasks = updatedColumns[editingTask.column].tasks.map(task =>
      task.id === editingTask.id ? { ...task, ...newTask } : task
    );
    
    if (editingTask.column !== newTask.column) {
      updatedColumns[editingTask.column].tasks = updatedColumns[editingTask.column].tasks.filter(
        task => task.id !== editingTask.id
      );
      
      updatedColumns[newTask.column].tasks.push({ ...newTask, id: editingTask.id });
    }
  
    setColumns(updatedColumns);
    closeModal();
  };

  const deleteTask = (columnKey, taskId) => {
    const updatedColumns = { ...columns };
    updatedColumns[columnKey].tasks = updatedColumns[columnKey].tasks.filter(task => task.id !== taskId);
    setColumns(updatedColumns);
  };

  const TaskCard = ({ task, columnKey }) => (
    <div className="bg-white rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{task.title}</span>
      </div>
      <div className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full w-fit mb-3">
        {task.tag}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {task.assignees.map((assignee, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
            >
              {assignee}
            </div>
          ))}
        </div>
        <span className="text-xs text-gray-500">{task.date}</span>
      </div>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => deleteTask(columnKey, task.id)}
          className="text-red-500 text-xs"
        >
          Delete
        </button>
        <button
          onClick={() => openModalForEdit(task)}
          className="text-blue-500 text-xs"
        >
          Edit
        </button>
      </div>
    </div>
  );

  const Column = ({ title, tasks, columnKey }) => (
    <div className="flex-1 min-w-[280px] bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{title}</h3>
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="text-gray-400 hover:text-gray-600" onClick={openModal}>
          <PlusIcon size={20} />
        </button>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} columnKey={columnKey} />
        ))}
      </div>
    </div>
  );

  const openModalForEdit = (task) => {
    setNewTask(task);
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Panel de Tareas</h1>
        <button
          onClick={() => alert('Has cerrado sesión.')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {Object.entries(columns).map(([key, column]) => (
          <Column key={key} title={column.title} tasks={column.tasks} columnKey={key} />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-medium mb-4">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
            <input
              type="text"
              placeholder="Titulo"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="Descripción"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Categoria (e.j., Diseño Web)"
              value={newTask.tag}
              onChange={(e) => setNewTask({ ...newTask, tag: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Fecha de entrega"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Asignado a :</label>
              <select
                value={newTask.assignees}
                onChange={(e) => setNewTask({ ...newTask, assignees: [...e.target.selectedOptions].map(option => option.value) })}
                multiple
                className="w-full p-2 border rounded"
              >
                {users.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Estado</label>
              <select
                value={newTask.column}
                onChange={(e) => setNewTask({ ...newTask, column: e.target.value })}
                className="w-full p-2 border rounded"
              >
                {Object.entries(columns).map(([key, column]) => (
                  <option key={key} value={key}>
                    {column.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={editingTask ? editTask : addTask}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                {editingTask ? 'Save Changes' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;