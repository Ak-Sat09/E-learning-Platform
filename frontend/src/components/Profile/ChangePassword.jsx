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

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const toast = useToast();

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/v1/changepassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Password changed successfully.',
          description: 'Your password has been updated.',
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
        description: 'Unable to change password. Please try again later.',
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
          Change Password
        </Heading>

        <form onSubmit={submitHandler}>
          <VStack spacing={8}>
            <Input
              required
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="Old Password"
              type={'password'}
              focusBorderColor="teal.500"
            />

            <Input
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="New Password"
              type={'password'}
              focusBorderColor="teal.500"
            />

            <Button
              type="submit"
              w="full"
              colorScheme="teal"
            >
              Change
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePassword;
