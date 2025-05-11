import { useEffect, useState } from 'react';
import axios from 'axios';

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
    if (!text.trim()) return;
    try {
      await axios.post(`${API_BASE_URL}/api/tasks`, { title: text });
      setText('');
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Task Manager</h1>
      <div style={styles.inputSection}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter a task"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>Add</button>
      </div>

      <ul style={styles.taskList}>
        {tasks.map(task => (
          <li key={task._id} style={styles.taskItem}>
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task._id)} style={styles.deleteButton}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#a592bc',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif'

  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  inputSection: {
    display: 'flex',
    marginBottom: '20px'
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  addButton: {
    marginLeft: '10px',
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  taskList: {
    listStyleType: 'none',
    padding: 0
  },
  taskItem: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default App;

