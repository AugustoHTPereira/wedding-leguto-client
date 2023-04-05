import React, { useState, useEffect } from 'react';
import { SimpleGrid, GridItem, Box, Image, Text, usePrefersReducedMotion, keyframes, useToast } from '@chakra-ui/react';
import api from '../../../../Services/API';
import { Picture } from '../../../Fototeca';
import Background from '../../../../Assets/img/wedding-bg-2.jpg';

const backgroundBlurKeyframe = keyframes`
    from { opacity: 0 }
    to { opacity: 1 }
`

const HomePhototeca = () => {
    const [photos, setPhotos] = useState<Picture[]>([]);
    const toast = useToast();
    const backgroundBlurAnimation = usePrefersReducedMotion()
        ? undefined
        : `${backgroundBlurKeyframe} 200ms ease-in-out`;

    const fetchPhotos = async () => {
        try {
            const { data } = await api.get<Picture[]>("/picture")
            setPhotos(data);
        } catch (error: any) {
            toast({
                status: 'error',
                description: 'Falha ao carregar a fototeca',
                title: 'Não foi possível carregar as imagens da fototeca. Atualize sua página. ' + error.message
            });
        }
    }

    useEffect(() => {
        fetchPhotos();
    }, []);


    if (!photos?.length)
        return (
            <Box
                minH='100vh'
                w='full'
                px='6'
                py={{ base: '12', md: '32' }}
                position='relative'
                backgroundImage={`url(${Background})`}
                backgroundRepeat='no-repeat'
                backgroundSize='cover'
            >
            </Box>
        );

    return (
        <Box
            px='0.5'
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
                animation={backgroundBlurAnimation}
            />

            <Box
                mx='auto'
                maxW='container.xl'
                w='full'
                position='relative'
            >
                <Text
                    textAlign='center'
                    mb='8'
                    color='white'
                    fontWeight='semibold'
                    fontSize='lg'
                    textShadow='0 1px 2px #00000088'
                >
                    Algumas fotos enviadas por nossos convidados
                </Text>

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

export default HomePhototeca;