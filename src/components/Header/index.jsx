import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

//import ColorModeSwitcher
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

export default function Header() {
  const navigate = useNavigate();
  //validate is have a auth_token in localStorage
  const validateToken = () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      return true;
    }
    return false;
  };

  //remove token from localStorage and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    console.log('Token Has Been Removed');
    navigate('/login');
  };

  return (
    <HStack
      justifyContent="space-between"
      py={3}
      px={4}
      alignItems="center"
      boxShadow="sm"
      rounded={8}
      bg="telegram.400"
      my={4}
    >
      <Box>
        <Heading as="h1" size="lg">
          <Link to="/"> Todo List </Link>
        </Heading>
      </Box>

      <Box>
        <span>
          {/* Login Menu */}
          <Button background="transparent" mx={2}>
            {/* Chek if has a token change to logout */}
            {validateToken() ? (
              <Text onClick={handleLogout}>Logout</Text>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Button>
        </span>
        <span>
          <ColorModeSwitcher />
        </span>
      </Box>
    </HStack>
  );
}
