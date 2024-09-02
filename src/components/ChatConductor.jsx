/* eslint-disable no-unused-vars */
// src/components/ChatConductor.js
import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { Box, List, ListItem, ListItemText, Typography, TextField, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatConductor = () => {
  const [senders, setSenders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedSender, setSelectedSender] = useState(null);
  const [input, setInput] = useState('');
  const stompClientRef = useRef(null);
  const url = 'http://localhost:8080';
  const userName = 'conductor'; // Asumiendo que el conductor siempre será "conductor"

  useEffect(() => {
    const fetchSenders = () => {
      fetch(url + '/api/chats')
        .then(response => response.json())
        .then(data => setSenders(data))
        .catch(error => console.error('Error fetching senders:', error));
    };

    fetchSenders();
    const intervalId = setInterval(fetchSenders, 1000);
    return () => clearInterval(intervalId);
  }, [url]);

  useEffect(() => {
    if (selectedSender) {
      const intervalId = setInterval(() => {
        fetch(url + `/api/messages?sender=${selectedSender}`)
          .then(response => response.json())
          .then(data => setMessages(data))
          .catch(error => console.error('Error fetching messages:', error));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [selectedSender, url]);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/websocket',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        client.subscribe('/topic/public', (messageOutput) => {
          showMessage(JSON.parse(messageOutput.body));
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
    
    if (input.trim() !== '' && stompClientRef.current && stompClientRef.current.connected) {
      const message = { content: input, sender: userName, receiver: selectedSender };
      stompClientRef.current.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(message),
      });
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput('');
    }
  };

  return (
    <Box display="flex" height="100%" p={2}>
      <Paper sx={{ width: '25%', mr: 2, p: 2 }}>
        <Typography variant="h6">Chats</Typography>
        <List>
          {senders.map((sender, index) => (
            <ListItem 
              key={index} 
              button 
              onClick={() => setSelectedSender(sender)} 
              selected={selectedSender === sender}
            >
              <ListItemText primary={sender} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography variant="h6">
          {selectedSender || "Selecciona un chat para ver los mensajes"}
        </Typography>
        <Box 
          flex={1} 
          overflow="auto" 
          display="flex" 
          flexDirection="column" 
          mt={2} 
          mb={1}
          sx={{ maxHeight: '70vh' }}
        >
          {selectedSender ? (
            messages.map((message, index) => (
              <Box
                key={index}
                justifyContent={message.sender === userName ? 'flex-end' : 'flex-start'}
                mb={1}
                p={1}
                bgcolor={message.sender === userName ? 'primary.light' : 'secondary.light'}
                borderRadius={1}
                maxWidth="75%"
              >
                <Typography variant="body1">
                  <strong>{message.sender}:</strong> {message.content}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No hay mensajes</Typography>
          )}
        </Box>

        {selectedSender && (
          <Box display="flex" alignItems="center" mt={2}>
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
        )}
      </Paper>
    </Box>
  );
};

export default ChatConductor;
