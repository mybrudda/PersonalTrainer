import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import Customer from './components/Customer';
import Training from './components/Training';

function App() {
  const [selectedTab, setSelectedTab] = useState('training');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <AppBar position="fixed" style={{ height: '70px' }}> 
        <Toolbar style={{ justifyContent: 'center' }}> 
          <Typography variant="h4" component="div">
            Fitness Trainer
          </Typography>
        </Toolbar>
        <Toolbar>
          <Button
            color={selectedTab === 'training' ? 'primary' : 'inherit'}
            onClick={() => handleTabChange('training')}
          >
            Training
          </Button>
          <Button
            color={selectedTab === 'customer' ? 'primary' : 'inherit'}
            onClick={() => handleTabChange('customer')}
          >
            Customer
          </Button>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <div style={{ marginTop: '80px' }}> 
        {selectedTab === 'training' ? <Training /> : <Customer />}
      </div>
    </>
  )
}

export default App;
