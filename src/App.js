import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!text.trim()) return;
    await axios.post('http://localhost:5000/tasks', { text });
    setText('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📝 Task Manager</h1>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter a task"
        style={{ padding: '8px', width: '250px' }}
      />
      <button onClick={addTask} style={{ marginLeft: '10px' }}>Add</button>
      <ul style={{ marginTop: '20px' }}>
        {tasks.map(task => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '10px' }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
