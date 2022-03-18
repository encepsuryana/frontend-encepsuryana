import React from 'react';
import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  Box,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  //login with username and password with axios store data object token to localStorage
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  const BASE_URL = 'http://94.74.86.174:8080/api/';
  const handleLogin = () => {
    axios
      .post(BASE_URL + 'login', {
        username: username,
        password: password,
      })
      .then(res => {
        localStorage.setItem('auth_token', res.data.data.token);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  //verify if has a token redirect to home page
  const validateToken = () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      navigate('/');
    }
  };

  React.useEffect(() => {
    validateToken();
  }, []);

  return (
    <VStack>
      <Box boxShadow="md" py={8} px={12} rounded="md">
        <Heading mb={8}>Login</Heading>
        <form onSubmit={handleLogin}>
          <FormControl mb={2}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>

          <Button onClick={handleLogin}>Login</Button>

          <Text fontSize="sm" mt={4}>
            Belum punya akun? <Link to="/register">Klik disini</Link>
          </Text>
        </form>
      </Box>
    </VStack>
  );
}
