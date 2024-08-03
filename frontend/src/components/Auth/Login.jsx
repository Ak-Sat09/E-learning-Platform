import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  Flex,
  Link as ChakraLink, // Alias Link to avoid conflict with react-router-dom Link
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/login', { email, password });
      toast({
        title: "Login successful.",
        description: `Welcome back, ${data.user.name}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/courses');
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.response?.data?.message || 'Something went wrong.',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box w="100%" maxW="md" mx="auto" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading as="h2" mb={6} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" w="full">
              Login
            </Button>
            <ChakraLink
              as={Link}
              to="/forget"
              color="teal.500"
              fontSize="sm"
              textAlign="center"
              mt={2}
            >
              Forgot Password?
            </ChakraLink>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
