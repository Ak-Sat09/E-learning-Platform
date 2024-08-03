import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios'; 

const Course = ({ views, title, imageSrc, id, addToPlaylistHandler, creator, description, lectureCount }) => {
  const handleWatchNowClick = () => {
    window.location.href = 'https://www.youtube.com/@akumg09';
  };

  return (
    <VStack className="course" alignItems={['center', 'flex-start']} borderWidth={1} borderRadius="lg" padding={4} boxShadow="md">
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} alt={title} />
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        size={'sm'}
        fontFamily={'sans-serif'}
        noOfLines={3}
      >
        {title}
      </Heading>
      <Text noOfLines={2}>{description}</Text>

      <HStack>
        <Text fontWeight={'bold'} textTransform="uppercase">Creator</Text>
        <Text fontFamily={'body'} textTransform="uppercase">{creator}</Text>
      </HStack>
      <Heading textAlign={'center'} size="xs" textTransform="uppercase">
        {`Lectures - ${lectureCount}`}
      </Heading>

      <Heading size="xs" textTransform="uppercase">
        {`Views - ${views}`}
      </Heading>

      <Stack direction={['column', 'row']} alignItems="center">
        <Button colorScheme={'teal'} onClick={handleWatchNowClick}>
          Watch Now
        </Button>

        <Button variant={'ghost'} colorScheme={'teal'} onClick={() => addToPlaylistHandler(id)}>
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/v1/courses', {
        params: { keyword, category },
      });
      setCourses(response.data.courses);
    } catch (error) {
      setError('Error fetching courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [category, keyword]);

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading m={'8'}>All Courses</Heading>

      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type={'text'}
        focusBorderColor="teal.500"
      />

      <HStack
        overflowX={'auto'}
        paddingY="8"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {['Web development', 'Artificial Intelligence', 'Data Structure & Algorithm', 'App Development', 'Data Science', 'Game Development'].map((item, index) => (
          <Button
            key={index}
            onClick={() => setCategory(item)}
            minW={'60'}
            colorScheme="teal"
          >
            <Text>{item}</Text>
          </Button>
        ))}
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="8">
        {loading ? (
          <Heading mt="4">Loading...</Heading>
        ) : error ? (
          <Heading mt="4" color="red.500">{error}</Heading>
        ) : courses.length > 0 ? (
          courses.map(course => (
            <Course
              key={course._id}
              title={course.title}
              description={course.description}
              views={course.views}
              imageSrc={course.poster.url}
              id={course._id}
              creator={course.createdBy}
              lectureCount={course.numOfVideos}
              addToPlaylistHandler={() => {}}
            />
          ))
        ) : (
          <Heading mt="4" color="gray.600">No courses found.</Heading>
        )}
      </SimpleGrid>
    </Container>
  );
};

export default CourseList;
