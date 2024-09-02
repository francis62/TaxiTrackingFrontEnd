// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Mapa from './components/Map';
import Chat from './components/Chat';
import ChatConductor from './components/ChatConductor';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Typography, Box, Container } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
}); 

const App = () => {
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('cliente');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (event) => {
  event.preventDefault();
  if (userName.trim()) { 
    setIsSubmitted(true);
    fetch('http://localhost:8080/start', {
      method: 'GET',
    }).then(() => {
      console.log('Iniciado el envío de coordenadas');
    }).catch((error) => {
      console.error('Error al iniciar el envío de coordenadas:', error);
    });
  } else {
    alert("Por favor, ingrese su nombre antes de continuar."); 
  }
};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/chatConductor" element={<ChatConductor />} />
          <Route path="/" element={
            <Container>
              {!isSubmitted ? (
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                      mt: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      backgroundImage: 'url(/assets/loginBackground.png)', 
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '100vh', 
                      width: '100%',   
                    }}
                  >
                  <Typography variant="h4" component="h1" gutterBottom>
                    Bienvenido a TaxiTracking
                  </Typography>
                  <TextField
                    id="username"
                    label="Ingresa su nombre"
                    variant="outlined"
                    size='normal'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <RadioGroup
                      row
                      aria-label="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <FormControlLabel value="cliente" control={<Radio />} label="Cliente" />
                      <FormControlLabel value="conductor" control={<Radio />} label="Conductor" />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Iniciar
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: '3fr 1fr', height: '100vh' }}>
                  <Box sx={{ overflowY: 'auto', borderRight: 1, borderColor: 'divider' }}>
                    <Mapa />
                  </Box>
                  <Box sx={{ overflowY: 'auto', backgroundImage: 'url(assets/chatBackground.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <Chat userName={userName} role={role}/>
                  </Box>
                </Box>
              )}
            </Container>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
