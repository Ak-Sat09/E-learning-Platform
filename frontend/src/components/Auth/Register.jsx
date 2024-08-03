import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  VStack,
  useToast,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#38B2AC',
  backgroundColor: 'white',
};

const fileUploadStyle = {
  '&::file-selector-button': fileUploadCss,
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/register', myForm);

      if (response.status === 200) {
        toast({
          title: 'Registration successful.',
          description: `Welcome, ${response.data.user.name}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/login'); // Redirect to the login page after successful registration
      } else {
        toast({
          title: 'An error occurred.',
          description: response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to register. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container h={'110vh'} display="flex" justifyContent="center" alignItems="center">
      <Box w="100%" maxW="md" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading textTransform={'uppercase'} textAlign="center" mb={6} color="teal.500">
          Registration
        </Heading>

        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box my="4" display={'flex'} justifyContent="center">
            <Avatar src={imagePrev} size={'2xl'} />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter Your Name"
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
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="teal.500"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              type={'password'}
              focusBorderColor="teal.500"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="chooseAvatar">Choose Avatar</FormLabel>
            <Input
              accept="image/*"
              required
              id="chooseAvatar"
              type={'file'}
              focusBorderColor="teal.500"
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>

          <Button my="4" colorScheme={'teal'} type="submit" w="full">
            Sign Up
          </Button>

          <Box my="4" textAlign="center">
            Already Signed Up?{' '}
            <Link to="/login">
              <Button colorScheme={'teal'} variant="link">
                Login
              </Button>{' '}
              here
            </Link>
          </Box>

          <Box my="4" textAlign="center">
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
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
