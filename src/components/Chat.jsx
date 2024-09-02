/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { Box, TextField, IconButton, Typography, Paper, List, ListItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import './styles/ChatStyles'

const Chat = ({ userName, role }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const stompClientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/websocket',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        client.subscribe('/chat/public', (messageOutput) => {
          const receivedMessage = JSON.parse(messageOutput.body);
          showMessage(receivedMessage);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  const showMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    console.log("Sending message:", {
      content: input,
      sender: userName,
      receiver: role === 'conductor' ? 'cliente' : 'conductor'
    });
  };

  const sendMessage = () => {
    if (input.trim() === '') {
      alert('El mensaje no puede estar vacío.');
      return;
    }

    if (stompClientRef.current && stompClientRef.current.connected) {
      const newMessage = {
        content: input,
        sender: role === 'conductor' ? 'conductor' : userName,
        receiver: role === 'conductor' ? 'cliente' : 'conductor',
      };
      stompClientRef.current.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify({ content: input, sender: userName, receiver: 'conductor' }),
      });
      setInput('');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', height: '100%'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <PersonIcon fontSize="large" sx={{ mr: 1 }} />
        <Typography variant="h6">
          {role === 'conductor' ? 'Conductor' : 'Cliente'}
        </Typography>
      </Box>
      <Box className="chatContainer" 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          mb: 2,
          backgroundImage: 'url(/assets/chatBackground.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
        <List>
          {messages.map((message, index) => (
            <ListItem 
              key={index} 
              sx={{ 
                display: 'flex', 
                justifyContent: message.sender === userName ? 'flex-end' : 'flex-start' 
              }}
            >
              <Box
                sx={{
                  bgcolor: message.sender === userName ? 'primary.light' : 'secondary.light',
                  color: 'black',
                  borderRadius: 1,
                  p: 1,
                  maxWidth: '75%',
                }}
              >
                <Typography variant="body1">
                  <strong>{message.sender }:</strong> {message.content}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          sx={{ mr: 2 }}
        />
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Chat;
