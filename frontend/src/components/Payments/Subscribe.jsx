import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';
import toast from 'react-hot-toast';

const Subscribe = ({ user }) => {
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [courseError, setCourseError] = useState(null);

  const subscribeHandler = async () => {
    setLoading(true);
    try {
      const { data: { key } } = await axios.get('/razorpaykey'); // Assuming endpoint is relative to the current server
      setKey(key);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch Razorpay key');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
    if (courseError) {
      toast.error(courseError);
      setCourseError(null);
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'CourseBundler',
          description: 'Get access to all premium content',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: '/paymentverification', // Replace with actual callback URL
          prefill: {
            name: user?.name || '', // Ensure user.name is safely accessed
            email: user?.email || '',
            contact: '',
          },
          notes: {
            address: '6 pack programmer at youtube',
          },
          theme: {
            color: '#008080', // Teal color
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [error, courseError, subscriptionId, user?.name, user?.email, key]);

  return (
    <Container h="90vh" p="16">
      <Heading children="Welcome" my="8" textAlign={'center'} />

      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        <Box bg="teal.400" p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'black'} children={`Pro Pack - ₹299.00`} />
        </Box>
        <Box p="4">
          <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
            <Text children={`Join pro pack and get access to all content.`} />
            <Heading size="md" children={'₹299 Only'} />
          </VStack>

          <Button
            my="8"
            w="full"
            colorScheme={'teal'}
            onClick={subscribeHandler}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>

        <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            color={'white'}
            textTransform="uppercase"
            size="sm"
            children={'100% refund at cancellation'}
          />

          <Text
            fontSize={'xs'}
            color="white"
            children={'*Terms & Conditions Apply'}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
