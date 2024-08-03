import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/v1/courserequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, course }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Course request sent successfully!');
        setName('');
        setEmail('');
        setCourse('');
      } else {
        toast.error(data.message || 'An error occurred');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <Container h="102vh">
      <Box h="100%" overflowY="auto">
        <VStack h="full" justifyContent="center" spacing="16">
          <Heading>Request New Course</Heading>

          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <Box my={'4'}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                required
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Abc"
                type={'text'}
                focusBorderColor="teal.500"
              />
            </Box>

            <Box my={'4'}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                type={'email'}
                focusBorderColor="teal.500"
              />
            </Box>

            <Box my={'4'}>
              <FormLabel htmlFor="course">Course</FormLabel>
              <Textarea
                required
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Explain the course...."
                focusBorderColor="teal.500"
              />
            </Box>

            <Button isLoading={loading} my="4" colorScheme={'teal'} type="submit">
              Send Mail
            </Button>

            <Box my="4">
              See available courses!{' '}
              <Link to="/courses">
                <Button colorScheme={'teal'} variant="link">
                  Click here
                </Button>
              </Link>
            </Box>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default Request;
