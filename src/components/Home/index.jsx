import { Box, Heading, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';

export default function Home() {
  //get all data from API with Bearer auth_token in localStorage
  const BASE_URL = 'http://94.74.86.174:8080/api/';
  const token = localStorage.getItem('auth_token');
  const headers = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  const [todos, setTodos] = React.useState([]);

  //get all data from API with Bearer auth_token in localStorage
  React.useEffect(() => {
    //validate if has a not token
    validateToken();

    if (token === null) {
      console.log('Access Denied! auth_token null');
    } else {
      console.log('Access Granted! auth_token not null');
      axios
        .get(BASE_URL + 'checklist', headers)
        .then(res => {
          setTodos(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  //validate when not have auth_token
  const validateToken = () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      return true;
    }
    return false;
  };

  return (
    <VStack>
      <Box boxShadow="md" py={8} px={12} rounded="md">
        <Heading mb={8}>{!validateToken() ? 'Login' : 'Home'}</Heading>
        {/* if not have auth_token show message else show data */}
        {!validateToken() ? (
          <p>You need to login to see the list</p>
        ) : (
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        )}
      </Box>
    </VStack>
  );
}
