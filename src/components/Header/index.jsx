import {
  Container,
  Text,
  ChakraProvider,
  theme,
  HStack,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

function index() {
  //check if user is logged in change login to logout
  const isLoggedIn = localStorage.getItem('token');

  return (
    //Header with chakra ui
    <ChakraProvider theme={theme}>
      <Container maxW="4xl">
        <HStack
          justifyContent="space-between"
          py={4}
          px={2}
          background="aquamarine"
        >
          <Box>
            <Link to="/"> Todo List </Link>
          </Box>

          <Box>
            {/* Switch login to logout */}
            {isLoggedIn ? (
              <Link to="/login"> Logout </Link>
            ) : (
              <Link to="/login"> Login </Link>
            )}
            <ColorModeSwitcher />
          </Box>
        </HStack>
      </Container>
    </ChakraProvider>
  );
}

export default index;
