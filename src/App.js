import { useEffect, useState } from 'react';
import axios from 'axios';

// Base URL for your backend API, using an environment variable for flexibility
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState(""); 

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!text.trim()) return; // Prevent adding empty tasks
    try {
      await axios.post(`${API_BASE_URL}/api/tasks`, { title: text });
      setText(''); // Clear input field
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/tasks/${id}`);
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []); // Empty dependency array means this runs only once on initial render

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
          <li key={task._id}> {/* _id from MongoDB is used as a unique key */}
            {task.title}
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '10px' }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;