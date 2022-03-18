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

export default function Register() {
  //Register with username, email, password with axios store data object token to localStorage
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();

  const BASE_URL = 'http://94.74.86.174:8080/api/';
  const handleRegister = () => {
    axios
      .post(BASE_URL + 'register', {
        username: username,
        password: password,
        email: email,
      })
      .then(res => {
        navigate('/login');
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
        <Heading mb={8}>Register</Heading>
        <form onSubmit={handleRegister}>
          <FormControl mb={2}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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

          <Button onClick={handleRegister}>Register</Button>

          <Text fontSize="sm" mt={4}>
            Sudah punya akun? <Link to="/login">Klik disini</Link>
          </Text>
        </form>
      </Box>
    </VStack>
  );
}
