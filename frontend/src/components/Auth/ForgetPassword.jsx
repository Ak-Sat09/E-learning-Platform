import {
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useToast,
  Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/v1/forgetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Reset link sent.',
          description: `A reset link has been sent to ${email}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'An error occurred.',
          description: data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to send reset link. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container h="90vh" display="flex" justifyContent="center" alignItems="center">
      <Box w="100%" maxW="md" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading
          textTransform={'uppercase'}
          textAlign="center"
          mb={6}
          color="teal.500"
        >
          Forget Password
        </Heading>

        <form onSubmit={submitHandler}>
          <VStack spacing={8}>
            <Input
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="teal.500"
            />

            <Button
              type="submit"
              w={'full'}
              colorScheme="teal"
            >
              Send Reset Link
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default ForgetPassword;
