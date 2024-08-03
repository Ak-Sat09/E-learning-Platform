import {
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useToast,
  Box,
} from '@chakra-ui/react';
import React, {  useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/v1/resetpassword/${params.token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Password reset successful.',
          description: 'Your password has been reset successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/login');
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
        description: 'Unable to reset password. Please try again later.',
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
          Reset Password
        </Heading>

        <form onSubmit={submitHandler}>
          <VStack spacing={8}>
            <Input
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="New Password"
              type={'password'}
              focusBorderColor="teal.500"
            />

            <Button
              type="submit"
              w={'full'}
              colorScheme="teal"
            >
              Reset Password
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
