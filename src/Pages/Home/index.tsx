import React from 'react';
import { 
    Box, 
    Flex, 
    Image, 
    Text, 
    IconButton, 
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
    StackItem,
    StackDivider,
    useMediaQuery,
    Button
} from '@chakra-ui/react';

import BackgroundImage from '../../Assets/img/wedding-bg.jpg';
import BackgroundImage2 from '../../Assets/img/wedding-bg-2.jpg';
import Brand from '../../Assets/img/brand-white.svg';
import useWeddingDate from '../../Hooks/useWeddingDate';
import { Link, useNavigate } from 'react-router-dom';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import useIdentityContext from '../../Contexts/IdentityContext';

const Home = () => {
    const { dateStr, diff: { d: days } } = useWeddingDate();
    const { isLoading, isSignedIn, name, type, signout } = useIdentityContext();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null)
    const navigate  =useNavigate();

    const [isLargerThanMd] = useMediaQuery('(min-width: 1024px)');

    const handleSignout = () => {
        signout();
    }

    return (
        <>
            <Box minH='100vh' w='full'>
                <Box
                    bg='teal.800'
                    bgImage={{base: BackgroundImage, lg: BackgroundImage2}}
                    backgroundRepeat='no-repeat'
                    backgroundSize='cover'
                    backgroundPosition='center 24%'
                    h='100vh'
                    position='relative'>
                    <Flex
                        align='center'
                        justify='space-between'
                        w='full'
                        pt='6'
                        px='6'
                        pb='12'
                        bgImage='linear-gradient(0deg, transparent 0%, #000000cc 100%)'>
                        <Box w='full'>
                            <Flex justifyContent='space-between' align='end' w='full'>
                                <Image src={Brand} w='20' />
                                <Box color='white' ml='4' fontSize='sm'>
                                    <IconButton ref={btnRef} aria-label='Open menu' icon={<HamburgerIcon />} variant='ghost' fontSize='3xl' onClick={onOpen} />
                                </Box>
                            </Flex>
                            <Text mt='4' color='white' fontSize='lg' fontWeight='medium'>LEILANNE E AUGUSTO</Text>
                        </Box>
                    </Flex>

                    <Box
                        px='6' 
                        pt='32' 
                        position='absolute' 
                        bottom='0' 
                        left='0' 
                        w='full' 
                        pb='24' 
                        bgImage='linear-gradient(0deg, #000000aa 50%, transparent 100%)'
                        textAlign={{base: 'left', lg: 'right'}}
                        pr={{base: '6', lg: '12'}}>
                        <Box color='white' textTransform='uppercase' fontSize='xs' mb='4' textShadow='sm' maxW='container.sm' ml={{base: 'none', lg: 'auto'}}>
                            <Text>
                                “Deus mudou o teu caminho até juntares com o meu e guardou a tua vida separando-a para mim. Para onde fores, irei; onde tu repousares, repousarei. Teu Deus será o meu Deus. Teu caminho o meu será.”
                                <Text fontWeight='bold' as='span'> (Rute 1:16,17)</Text>
                            </Text>
                        </Box>

                        <Text fontSize='3xl' fontWeight='black' lineHeight='1' color='white' textShadow='sm'>
                            SAVE THE DATE
                        </Text>

                        <Text color='white' textTransform='uppercase' fontWeight='medium'>
                            Restam {days} dias para a cerimônia.
                        </Text>
                    </Box>
                    <Box position='absolute' right='4' bottom='0' w='1px' bg='whiteAlpha.400' top='32' />
                    <Box position='absolute' right='3' bottom='0' w='1px' bg='whiteAlpha.400' top='44' />
                    <Box position='absolute' right='2' bottom='0' w='1px' bg='whiteAlpha.400' top='20' />
                </Box>
            </Box>

            <Drawer
                isOpen={isOpen}
                placement={isLargerThanMd ? 'right' : 'top'}
                size={isLargerThanMd ? 'lg' : 'full'}
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent bg='blackAlpha.700' backdropFilter='blur(80px)' color='white'>
                    <DrawerCloseButton top='6' fontSize='lg' right='4' />
                    <DrawerHeader>
                        <Text fontSize='xs'>#LEGUTO</Text>
                        <Text>LEILANNE E AUGUSTO</Text>
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack divider={<StackDivider borderColor='whiteAlpha.100' />} spacing='3' mt='6'>
                            <StackItem w='full'>
                                <Link to='/gifts'>
                                    LISTA DE PRESENTES
                                </Link>
                            </StackItem>
                            
                            {
                                isSignedIn && (
                                        <StackItem w='full'>
                                            <Link to='/fototeca'>
                                                FOTOTECA
                                            </Link>
                                        </StackItem>
                                )
                            }

                            {
                                isSignedIn && type === "groomsmen" && 
                                    <StackItem w='full'>
                                        <Link to='/manual'>
                                            MANUAL DO PADRINHO
                                        </Link>
                                    </StackItem>
                            }
                        </VStack>
                    </DrawerBody>

                    {
                        !isLoading && isSignedIn && (
                            <DrawerFooter textAlign='left' justifyContent='space-between'>
                                <Box>
                                    <Text>Olá {name}!</Text>
                                </Box>

                                <Box>
                                    <Button aria-label='Sair' onClick={handleSignout} variant='outline' colorScheme='red' size='sm'>
                                        Sair
                                    </Button>
                                </Box>
                            </DrawerFooter>
                        )
                    }
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Home;
