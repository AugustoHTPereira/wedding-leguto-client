import React, { useEffect, useState } from 'react';
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
    Button,
    SimpleGrid,
    GridItem,
    Skeleton
} from '@chakra-ui/react';

import BackgroundImage from '../../Assets/img/wedding-bg.jpg';
import BackgroundImage2 from '../../Assets/img/wedding-bg-2.jpg';
import Brand from '../../Assets/img/brand-white.svg';
import useWeddingDate from '../../Hooks/useWeddingDate';
import { Link, useNavigate } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import useIdentityContext from '../../Contexts/IdentityContext';
import { Picture } from '../Fototeca';
import api from '../../Services/API';

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
                            <Text mt='4' color='white' fontSize='lg' fontWeight='medium'>♡ LEILANNE E AUGUSTO</Text>
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

                        <Text color='white' textTransform='uppercase' fontWeight='medium' fontSize='xs'>
                            16.06.2023 - CAMPANHA - MG
                        </Text>
                    </Box>
                    <Box position='absolute' right='4' bottom='0' w='1px' bg='whiteAlpha.400' top='32' />
                    <Box position='absolute' right='3' bottom='0' w='1px' bg='whiteAlpha.400' top='44' />
                    <Box position='absolute' right='2' bottom='0' w='1px' bg='whiteAlpha.400' top='20' />
                </Box>
            </Box>

            <HomeFototeca />
            <HomeFooter />

            <HomeDrawer 
                name={name}
                isLargerThanMd={isLargerThanMd} 
                isOpen={isOpen} 
                onClose={onClose} 
                isSignedIn={isSignedIn} 
                onSignout={handleSignout} 
                isLoading={isLoading} 
                type={type} 
                btnRef={btnRef} />
        </>
    )
}

export default Home;

interface HomeDrawerProps {
    isOpen: boolean,
    isSignedIn: boolean,
    type: string,
    onClose: () => void,
    onSignout: () => void,
    btnRef?: React.RefObject<any> | undefined,
    isLargerThanMd: boolean,
    isLoading: boolean,
    name:string,
}

const HomeDrawer = ({ isOpen, onClose, btnRef, isLargerThanMd, isLoading, type, isSignedIn, onSignout, name }: HomeDrawerProps) => {
    return (
        <Drawer
            isOpen={isOpen}
            placement={isLargerThanMd ? 'right' : 'top'}
            size={isLargerThanMd ? 'lg' : 'full'}
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent bg='blackAlpha.400' backdropFilter='blur(25px)' color='white'>
                <DrawerCloseButton top='6' fontSize='lg' right='4' />
                <DrawerHeader>
                    <Text fontSize='xs'>#LEGUTO</Text>
                    <Text>LEILANNE E AUGUSTO</Text>

                    {
                        !isLoading && isSignedIn && (
                            <Flex align='center' justify='space-between' p='2' bg='whiteAlpha.200' borderRadius='base' mt='4' backdropFilter='blur(25px)'>
                                <Box>
                                    <Text fontSize='md'>Olá {name}!</Text>
                                </Box>

                                <Box>
                                    <Button aria-label='Sair' onClick={onSignout} variant='outline' colorScheme='red' size='sm'>
                                        SAIR
                                    </Button>
                                </Box>
                            </Flex>
                        )
                    }
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
            </DrawerContent>
        </Drawer>
    )
}

const HomeFototeca = () => {
    const [photos, setPhotos] = useState<Picture[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchPhotos = async () => {
        const response = await api.get<Picture[]>("/picture")
        setPhotos(response.data)

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    useEffect(() => {
        fetchPhotos();
    }, [])

    if (!photos.length && !isLoading)
        return null;

    return (
        <Box w='full' p='1' py={{base: '1', lg: '32'}} bgImage={`url(${photos[0]?.originalUrl})`} bgColor='white' backgroundSize='cover' backgroundPosition='center' backgroundRepeat='repeat-y' position='relative'>
            <Box w='full' position='absolute' left='0' top='0' bottom='0' right='0' bg='blackAlpha.400' backdropFilter='blur(62px)' />

            <Box w='full' maxW='container.lg' mx='auto'>
                {
                    isLoading && (
                        <SimpleGrid templateColumns={{base: '1fr 1fr', md: '1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr'}} gridGap='1'>
                            <GridItem>
                                <Skeleton h='160px' w='full' />
                            </GridItem>
                            <GridItem>
                                <Skeleton h='160px' w='full' />
                            </GridItem>
                            <GridItem>
                                <Skeleton h='160px' w='full' />
                            </GridItem>
                            <GridItem>
                                <Skeleton h='160px' w='full' />
                            </GridItem>
                            <GridItem>
                                <Skeleton h='160px' w='full' />
                            </GridItem>
                        </SimpleGrid>
                    )
                }

                {
                    !isLoading && !!photos.length && (
                        <SimpleGrid templateColumns={{base: '1fr 1fr', md: '1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr'}} gridGap='1' userSelect='none'>
                        {
                            photos.map(photo => (
                                <GridItem key={photo.id}>
                                    <Box position='relative'>
                                        <Image w='full' h='220' objectFit='cover' src={photo.originalUrl} bg='gray.200' objectPosition='top' bgColor='blackAlpha.400' backdropFilter='blur(25px)' />
                                        <Box position='absolute' bottom='0' px='2' py='2' bg='blackAlpha.400' w='full' backdropFilter='blur(25px)'>
                                            <Text fontSize='xs' fontWeight='medium' lineHeight='1' color='white' textShadow='0 1px 1px #43434344'>Enviado por {photo.owner}</Text>
                                        </Box>
                                    </Box>
                                </GridItem>
                            ))
                        }
                        </SimpleGrid>
                    )
                }
            </Box>
        </Box>
    )
}

const HomeFooter = () => {
    return (
        <Box w='full' px='6' bg='gray.800' py='6'>
            <Text color='gray.400' textAlign='center' fontSize='sm'>
                Casamento de Leilanne e Augusto ♡ Todos os direitos reservados ♡ Produzido pelo noivo
            </Text>
            <Text color='gray.400' textAlign='center' fontSize='xs'>
                Em caso de problemas ou dúvidas, entre em contato <Text fontWeight='semibold' textDecor='underline' as='a' href='mailto:augustohtp8@gmail.com'>augustohtp8@gmail.com</Text>.
            </Text>
        </Box>
    )
}