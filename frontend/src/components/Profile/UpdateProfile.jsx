import { Button, Container, Heading, Input, VStack, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const submitHandler = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put('http://localhost:5000/api/v1/updateprofile', { name, email });
      toast({
        title: "Profile updated successfully.",
        description: `Name: ${data.user.name}, Email: ${data.user.email}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/profile');
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container py="16" minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={'uppercase'}
          my="16"
          textAlign={['center', 'left']}
        >
          Update Profile
        </Heading>

        <VStack spacing={'8'}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type={'text'}
            focusBorderColor="teal.500"
          />
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type={'email'}
            focusBorderColor="teal.500"
          />
          <Button
            isLoading={loading}
            w="full"
            colorScheme={'teal'}
            type="submit"
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
