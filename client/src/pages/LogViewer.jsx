import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

// 👥 Team members mapping
const teamMembers = {
  gaurav: 'Gaurav Jain',
  shaurya: 'Shaurya Upadhyay',
  nitin: 'Nitin Jain',
  dhruv: 'Dhruv Pancholi',
};

export default function LogViewer() {
  const [viewMode, setViewMode] = useState('user');
  const [selectedUser, setSelectedUser] = useState('shaurya');
  const [selectedWeekStart, setSelectedWeekStart] = useState(dayjs().startOf('week'));
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch logs
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        let res;
        if (viewMode === 'user') {
          res = await axios.get(`https://dailytaskrecoder.onrender.com/api/logs/${selectedUser}`);
        } else {
          res = await axios.get(`https://dailytaskrecoder.onrender.com/api/logs`);
        }
        setLogs(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch logs:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [viewMode, selectedUser]);

  // Filter by week or user
  const filterLogs = () => {
    if (viewMode === 'user') {
      return logs.filter((log) => log.userId === selectedUser);
    } else {
      const start = dayjs(selectedWeekStart);
      const end = start.add(6, 'day');
      return logs.filter((log) =>
        dayjs(log.date).isAfter(start.subtract(1, 'day')) &&
        dayjs(log.date).isBefore(end.add(1, 'day'))
      );
    }
  };

  const logsToRender = filterLogs();

  const groupedByDay = logsToRender.reduce((acc, log) => {
    const day = dayjs(log.date).format('dddd, MMM D');
    if (!acc[day]) acc[day] = [];
    acc[day].push(log);
    return acc;
  }, {});

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-zinc-900 to-black text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">🗂️ View Technical Logs</h1>

        {/* View Switch */}
        <div className="flex gap-4 justify-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="user"
              checked={viewMode === 'user'}
              onChange={() => setViewMode('user')}
            />
            By User
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="week"
              checked={viewMode === 'week'}
              onChange={() => setViewMode('week')}
            />
            By Week
          </label>
        </div>

        {/* Filters */}
        {viewMode === 'user' ? (
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="bg-zinc-800 text-white p-2 rounded border border-zinc-600 w-full max-w-sm mx-auto block"
          >
            {Object.entries(teamMembers).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="date"
            value={selectedWeekStart.format('YYYY-MM-DD')}
            onChange={(e) => setSelectedWeekStart(dayjs(e.target.value))}
            className="bg-zinc-800 text-white p-2 rounded border border-zinc-600 w-full max-w-sm mx-auto block"
          />
        )}

        {/* Logs */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-zinc-400">Loading logs...</p>
          ) : viewMode === 'week' ? (
            Object.entries(groupedByDay).map(([day, logs]) => (
              <div key={day} className="space-y-3">
                <h2 className="text-xl font-semibold text-blue-300 border-b border-white/10 pb-1">
                  {day}
                </h2>
                {logs.map((log, i) => (
                  <LogCard key={i} log={log} />
                ))}
              </div>
            ))
          ) : (
            logsToRender.map((log, i) => <LogCard key={i} log={log} />)
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ LogCard Component
function LogCard({ log }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl shadow-lg space-y-4">
      <div className="flex justify-between text-sm text-zinc-500 font-mono">
        <span>👨‍💻 {teamMembers[log.userId]}</span>
        <span>🗓️ {dayjs(log.date).format('ddd, MMM D YYYY')}</span>
      </div>
      <h3 className="text-xl font-bold text-cyan-400">🚀 {log.title}</h3>
      <DocSection label="📌 Today's Work" content={log.todayWork} />
      <DocSection label="💻 Technical Details" content={log.technicalDetails} isCode />
      <DocSection label="🐞 Problems Faced" content={log.problemsFaced} />
      <DocSection label="🧠 Solutions / References" content={log.solutions} isCode />
      <DocSection label="🎯 Next Plan" content={log.nextPlan} />
      <div className="flex flex-wrap gap-2 pt-2">
        {log.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-zinc-800 text-blue-300 text-xs px-3 py-1 rounded-full font-mono"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ✅ Reusable Section
function DocSection({ label, content, isCode = false }) {
  return (
    <div>
      <h4 className="text-sm text-zinc-400 font-semibold mb-1">{label}</h4>
      {isCode ? (
        <pre className="bg-zinc-900 text-green-400 text-sm font-mono p-3 rounded-lg overflow-auto whitespace-pre-wrap border border-zinc-800">
          {content}
        </pre>
      ) : (
        <p className="text-zinc-100 text-sm whitespace-pre-wrap">{content}</p>
      )}
    </div>
  );
}
