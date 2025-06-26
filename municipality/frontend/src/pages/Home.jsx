import React from 'react';
import ComplaintForm from '../components/ComplaintForm';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Complaint Management System</h1>
      <p>Submit your civic issues to the municipality</p>
      <ComplaintForm />
    </div>
  );
};

export default Home;
