import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Fitness Trainer App</h1>
      <p>This app helps you manage your fitness training sessions and customers.</p>
      <p>Get started by navigating to the <Link to="/training">Training</Link> or <Link to="/customer">Customer</Link> pages.</p>
    </div>
  );
}

export default Home;