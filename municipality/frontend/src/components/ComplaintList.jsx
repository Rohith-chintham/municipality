import React, { useEffect, useState } from 'react';
import axios from '../api';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/complaints', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(res.data);

        // Basic check for admin based on first complaint's user role
        const user = JSON.parse(localStorage.getItem('user'));
        setIsAdmin(user?.role === 'admin');
      } catch (err) {
        alert('Failed to load complaints.');
      }
    };

    fetchComplaints();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/complaints/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  return (
    <div>
      <h2>Complaint List</h2>
      {complaints.map((c) => (
        <div key={c._id} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
          <h3>{c.title}</h3>
          <p><strong>Description:</strong> {c.description}</p>
          <p><strong>Location:</strong> {c.location}</p>
          <p><strong>Status:</strong> {c.status}</p>
          {isAdmin && (
            <div>
              <button onClick={() => updateStatus(c._id, 'In Progress')}>Mark In Progress</button>
              <button onClick={() => updateStatus(c._id, 'Resolved')}>Mark Resolved</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
