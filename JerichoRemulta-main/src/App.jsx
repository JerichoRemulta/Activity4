import { useState, createContext, useContext } from 'react';
import './App.css';

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateStatus = (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (taskToUpdate) {
      setCompletedTasks([...completedTasks, taskToUpdate]);
      deleteTask(id);
    }
  };

  return (
    <TodoContext.Provider value={{ tasks, completedTasks, addTask, deleteTask, updateStatus }}>
      {children}
    </TodoContext.Provider>
  );
}

function TodoList() {
  const { tasks, completedTasks, addTask, deleteTask, updateStatus } = useContext(TodoContext);
  const [taskInput, setTaskInput] = useState('');

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      addTask({ id: Date.now(), task: taskInput, status: 'Pending' });
      setTaskInput('');
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div>
        <input type="text" value={taskInput} onChange={handleInputChange} />
        <button onClick={handleAddTask}>Create Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.task} - {task.status}
            <button onClick={() => updateStatus(task.id)}>Completed</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompletedTasks() {
  const { completedTasks, deleteTask } = useContext(TodoContext);

  return (
    <div>
      <h1>Completed Tasks</h1>
      <ul>
        {completedTasks.map(task => (
          <li key={task.id}>
            {task.task} - {task.status}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <div className="tabs">
          <input type="radio" name="tab" id="todo" defaultChecked />
          <label htmlFor="todo">To-Do List</label>
          <input type="radio" name="tab" id="completed" />
          <label htmlFor="completed">Completed Tasks</label>

          <div className="tab-content">
            <div id="todo-content">
              <TodoList />
            </div>
            <div id="completed-content">
              <CompletedTasks />
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;