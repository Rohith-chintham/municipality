import React, { useState } from 'react';
import axios from '../api';

const ComplaintForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/complaints',
        { title, description, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Complaint submitted successfully.');
      setTitle('');
      setDescription('');
      setLocation('');
    } catch (err) {
      alert('Error submitting complaint.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Complaint</h2>
      <input
        type="text"
        placeholder="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Location"
        required
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ComplaintForm;
