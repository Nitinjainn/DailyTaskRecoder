import { useState, useEffect } from 'react';
import axios from 'axios';

const userId = "user1"; // Replace with actual logged-in user ID

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [content, setContent] = useState("");

  const fetchLogs = async () => {
    const res = await axios.get(`/api/logs/${userId}`);
    setLogs(res.data);
  };

  const saveLog = async () => {
    await axios.post('/api/logs', { userId, content, date: new Date().toLocaleDateString() });
    setContent("");
    fetchLogs();
  };

  useEffect(() => { fetchLogs(); }, []);

  return (
    <div className="p-4">
      <textarea
        className="w-full p-2 border rounded"
        rows="8"
        placeholder="Write your daily work..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={saveLog}>Save</button>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Previous Logs</h2>
        {logs.map(log => (
          <div key={log._id} className="border p-2 mt-2 rounded">
            <p>{log.date}</p>
            <p>{log.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
