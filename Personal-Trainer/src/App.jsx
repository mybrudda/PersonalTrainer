import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Customer from './components/Customer';
import Training from './components/Training';

function NavigationBar({ handleTabChange }) {
  return (
    <AppBar position="fixed" style={{ height: '70px' }}> 
      <Toolbar style={{ justifyContent: 'center' }}> 
        <Typography variant="h4" component="div">
          Fitness Trainer
        </Typography>
      </Toolbar>
      <Toolbar style={{ justifyContent: 'center' }}>
        <Button
          color="inherit"
          component={Link}
          to="/training"
        >
          Training
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/customer"
        >
          Customer
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  const [selectedTab, setSelectedTab] = useState('training');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <Router>
        <NavigationBar />
        <Toolbar />
        <Routes>
          <Route path="/training" element={<Training />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="*" element={<h1>Page not found!</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;