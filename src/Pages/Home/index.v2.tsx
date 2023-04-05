import React, { useEffect, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, GridItem, HStack, IconButton, Image, SimpleGrid, StackDivider, StackItem, Text, VStack, useDisclosure, useToken } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Brand from '../../Assets/img/brand-white.svg';
import Background from '../../Assets/img/wedding-bg-2.jpg';
import useWeddingDate from "../../Hooks/useWeddingDate";
import { Picture } from "../Fototeca";
import api from "../../Services/API";

const Home = () => {
    return (
        <Box bg='black' minH='100vh'>
            <HomeNavbar />

            <HomeMainContent />
            <HomeWelcomeSection />
            <HomePhototeca />
        </Box>
    )
}

const HomeNavbar = () => {
    return (
        <>
            <Box
                h='16'
            />

            <Box
                px='6'
                bg='black'
                borderBottom='1px'
                borderBottomColor='whiteAlpha.100'
                position='fixed'
                zIndex='docked'
                left='0'
                top='0'
                right='0'
            >
                <Flex
                    align='center'
                    justify='space-between'
                    mx='auto'
                    maxW='container.xl'
                    w='full'
                    h='16'
                >
                    <Link to='/'>
                        <Image src={Brand} h='8' />
                    </Link>

                    <HStack spacing='8' display={{ base: 'none', md: 'flex' }}>
                        <StackItem>
                            <Text
                                as={Link}
                                to='/gifts'
                                color='gray.100'
                            >
                                Nossa história
                            </Text>
                        </StackItem>

                        <StackItem>
                            <Text
                                as={Link}
                                to='/gifts'
                                color='gray.100'
                            >
                                Lista de presentes
                            </Text>
                        </StackItem>

                        <StackItem>
                            <Text
                                as={Link}
                                to='/gifts'
                                color='gray.100'
                            >
                                Ajuda
                            </Text>
                        </StackItem>
                    </HStack>

                    <HomeDrawer />
                </Flex>
            </Box>
        </>
    )
}

const HomeDrawer = () => {
    const { onOpen, ...rest } = useDisclosure();

    return (
        <>
            <IconButton
                aria-label="Menu hamburguer"
                icon={<HamburgerIcon fontSize='2xl' />}
                colorScheme='blackAlpha'
                display={{ base: 'initial', md: 'none' }}
                onClick={onOpen}
            />

            <Drawer {...rest} size='xl'>
                <DrawerOverlay />
                <DrawerContent bg='black'>
                    <DrawerCloseButton color='gray.100' fontSize='xl' top='6' />

                    <DrawerHeader pt='16' pb='8'>
                        <Text
                            color='gray.100'
                            fontSize='3xl'
                            maxW='sm'
                            lineHeight='8'
                        >
                            Bem vindo(a) ao site do nosso casamento!
                        </Text>
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack spacing='6'>
                            <StackItem w='full'>
                                <Text
                                    as={Link}
                                    to='/history'
                                    color='gray.100'
                                    fontSize='xl'
                                >
                                    Nossa história
                                </Text>
                            </StackItem>

                            <StackItem w='full'>
                                <Text
                                    as={Link}
                                    to='/gifts'
                                    color='gray.100'
                                    fontSize='xl'
                                >
                                    Lista de presentes
                                </Text>
                            </StackItem>

                            <StackItem w='full'>
                                <Text
                                    as={Link}
                                    to='/help'
                                    color='gray.100'
                                    fontSize='xl'
                                >
                                    Ajuda
                                </Text>
                            </StackItem>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

const HomeMainContent = () => {
    const fullHeight = useToken('sizes', '16')
    const { diff: { d: days } } = useWeddingDate();

    return (
        <Box
            px='6'
        >
            <Box
                mx='auto'
                maxW='container.xl'
                w='full'
                minH={`calc(100vh - ${fullHeight})`}
                position='relative'
            >
                <Box
                    position='absolute'
                    bottom='0'
                    pb='20'
                >
                    <Text
                        mb='1'
                        color='gray.200'
                        fontSize={{ base: 'sm', md: 'md' }}
                    >
                        Restam {days} dias para a cerimônia.
                    </Text>

                    <HStack
                        color='gray.200'
                        spacing='4'
                        divider={<StackDivider opacity='.2' />}
                        mb='4'
                        fontSize={{ base: 'sm', md: 'md' }}
                        flexDir={{ base: 'column', md: 'row' }}
                    >
                        <StackItem w={{ base: 'full', md: 'unset' }}>
                            <Text>16.06.2023</Text>
                        </StackItem>
                        <StackItem w={{ base: 'full', md: 'unset' }}>
                            <Text>20:30h</Text>
                        </StackItem>
                        <StackItem w={{ base: 'full', md: 'unset' }}>
                            <Text>Campanha, MG</Text>
                        </StackItem>
                    </HStack>

                    <Text
                        color='gray.200'
                        fontSize={{ base: '5xl', md: '6xl' }}
                        fontWeight='semibold'
                        lineHeight='1'
                        mb='4'
                    >
                        Leilanne e Augusto
                    </Text>

                    <Text
                        color='gray.200'
                        maxW='xl'
                        fontSize={{ base: 'xs', md: 'md' }}
                    >
                        “Deus mudou o teu caminho até juntares com o meu e guardou a tua vida separando-a para mim. Para onde fores, irei; onde tu repousares, repousarei. Teu Deus será o meu Deus. Teu caminho o meu será.”
                        <Text
                            fontWeight='bold'
                            as='span'
                        >
                            {' '}
                            (Rute 1:16,17)
                        </Text>
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

const HomePhototeca = () => {
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

    if (!photos?.length)
        return null;

    return (
        <Box
            px='6'
            py={{ base: '12', md: '32' }}
            position='relative'
            backgroundImage={`url(${Background})`}
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            w='full'
        >
            <Box
                w='full'
                position='absolute'
                left='0'
                right='0'
                bottom='0'
                top='0'
                bg='blackAlpha.300'
                backdropFilter='blur(16px)'
            />

            <Box
                mx='auto'
                maxW='container.xl'
                w='full'
            >

                {
                    !!photos.length && (
                        <SimpleGrid templateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr' }} gridGap='0.5' userSelect='none'>
                            {
                                photos.map(photo => (
                                    <GridItem key={photo.id}>
                                        <Box position='relative'>
                                            <Image w='full' h='220' objectFit='cover' src={photo.originalUrl} bg='gray.200' objectPosition='top' bgColor='blackAlpha.600' backdropFilter='blur(32px)' />
                                            <Box position='absolute' bottom='0' px='2' py='2' bg='blackAlpha.400' w='full' backdropFilter='blur(25px)'>
                                                <Text fontSize='xs' fontWeight='medium' lineHeight='1' color='white' textShadow='0 1px 1px #43434344'>Enviado por <Text as='span' textTransform='capitalize'>{photo.owner.toLowerCase()}</Text></Text>
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

const HomeWelcomeSection = () => {
    return (
        <Box px='6' py='20'>
            <Box
                mx='auto'
                maxW='container.xl'
                w='full'
            >
                <Text
                    color='gray.200'
                    fontSize='3xl'
                    textAlign='center'
                    mb='4'
                >
                    Bem-vindos, amigos e familiares!
                </Text>
                <Text
                    color='gray.200'
                    textAlign='center'
                    maxW='xl'
                    mx='auto'
                >
                    Nós, com o apoio de nossos familiares e de Deus, vamos nos casar no dia <b>16 de junho de 2023</b>. Contamos com a sua presença na <b>Catedral de Santo Antônio</b> em <b>Campanha, MG</b>.
                </Text>
            </Box>
        </Box>
    )
}

export default Home;