import React from 'react';
import { ChakraProvider, theme, Container } from '@chakra-ui/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Importing components
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="2xl">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ChakraProvider>
  );
}

export default App;
