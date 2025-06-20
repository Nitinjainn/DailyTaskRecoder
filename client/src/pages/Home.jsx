import React, { useState } from 'react';
import axios from 'axios';

const teamMembers = [
  { id: 'gaurav', name: 'Gaurav Jain' },
  { id: 'shaurya', name: 'Shaurya Upadhyay' },
  { id: 'nitin', name: 'Nitin Jain' },
  { id: 'dhruv', name: 'Dhruv Pancholi' },
];

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(teamMembers[0].id);
  const [title, setTitle] = useState('');
  const [todayWork, setTodayWork] = useState('');
  const [technicalDetails, setTechnicalDetails] = useState('');
  const [problemsFaced, setProblemsFaced] = useState('');
  const [solutions, setSolutions] = useState('');
  const [nextPlan, setNextPlan] = useState('');
  const [tags, setTags] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const log = {
      userId: selectedUser,
      date: new Date(),
      title,
      todayWork,
      technicalDetails,
      problemsFaced,
      solutions,
      nextPlan,
      tags: tags.split(',').map((t) => t.trim()),
    };

    try {
      await axios.post('https://dailytaskrecoder.onrender.com/api/logs/add', log); // Change this URL if deployed
      setTitle('');
      setTodayWork('');
      setTechnicalDetails('');
      setProblemsFaced('');
      setSolutions('');
      setNextPlan('');
      setTags('');
      setError('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-8 shadow-lg border border-white/10">
        <h1 className="text-3xl font-bold mb-2">📚 Project Daily Technical Log</h1>
        <p className="text-zinc-400 mb-6">
          Fill out today's work details in a structured format.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Team Member</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <Input label="Title (e.g. 'Connected MongoDB')" value={title} onChange={setTitle} />
          <Textarea label="Today's Work Summary" value={todayWork} onChange={setTodayWork} rows={3} />
          <Textarea label="Technical Details" value={technicalDetails} onChange={setTechnicalDetails} rows={4} />
          <Textarea label="Problems Faced" value={problemsFaced} onChange={setProblemsFaced} rows={3} />
          <Textarea label="Solutions / References" value={solutions} onChange={setSolutions} rows={3} />
          <Textarea label="Next Plan" value={nextPlan} onChange={setNextPlan} rows={2} />
          <Input label="Tags (comma separated)" value={tags} onChange={setTags} placeholder="e.g. frontend,auth,api" />

          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2 text-white text-lg font-medium disabled:opacity-50"
          >
            🚀 Submit Log
          </button>

          {submitted && (
            <p className="text-green-400 mt-2 text-sm">✅ Log submitted successfully!</p>
          )}
          {error && (
            <p className="text-red-400 mt-2 text-sm">❌ {error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, rows }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      ></textarea>
    </div>
  );
}
