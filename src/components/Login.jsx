import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Rest API http://94.74.86.174:8080/api/login call to login get data token to localsotrage

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://94.74.86.174:8080/api/login/', {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container>
      <Header />

      {/* Login form */}
      <Flex width="full" align="center" justifyContent="center">
        <Box p={2}>
          <Heading>Login</Heading>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </Box>
      </Flex>
    </Container>
  );
}
