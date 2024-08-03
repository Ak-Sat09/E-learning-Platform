import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill, RiQuestionFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'} fontSize="sm" colorScheme={'teal'}>
      {title}
    </Button>
  </Link>
);

const Header = ({ isAuthenticated = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    onClose();
    console.log('Logout clicked');
  };

  return (
    <>
      <ColorModeSwitcher />

      <Button
        onClick={onOpen}
        colorScheme={'teal'}
        size="sm"
        rounded="full"
        position={'fixed'}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent maxW="250px">
          <DrawerHeader borderBottomWidth={'1px'} fontSize="sm">
            Genius Hub
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={'2'} alignItems="flex-start">
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton onClose={onClose} url="/courses" title="Browse Courses" />
              <LinkButton onClose={onClose} url="/request" title="Request Course" />
              <LinkButton onClose={onClose} url="/contact" title="Contact" />
              <LinkButton onClose={onClose} url="/about" title="About" /> 

              <HStack
                justifyContent={'space-evenly'}
                position="absolute"
                bottom={'1rem'}
                width="100%"
              >
                {isAuthenticated ? (
                  <>
                    <Link onClick={onClose} to="/profile">
                      <Button variant={'ghost'} fontSize="sm" colorScheme={'teal'}>
                        Profile
                      </Button>
                    </Link>
                    <Button variant={'ghost'} fontSize="sm" onClick={logoutHandler} colorScheme={'teal'}>
                      <RiLogoutBoxLine />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to="/login">
                      <Button colorScheme={'teal'} fontSize="sm">
                        Login
                      </Button>
                    </Link>
                    <Link onClick={onClose} to="/register">
                      <Button colorScheme={'teal'} fontSize="sm">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}

               
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
