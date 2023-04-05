import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text, Spinner, useToast } from '@chakra-ui/react';
import Texture from '../../Assets/img/absurdity.png';
import Brand from '../../Assets/img/brand.svg';
import { Link } from 'react-router-dom';
import JaparatingaImage from '../../Assets/img/japaratinga.jpeg';
import { GiftType } from '../../Contracts/Gifts';
import api from '../../Services/API';
import useIdentityContext from '../../Contexts/IdentityContext';
import useHistoric from '../../Hooks/useHistoric';
import Searcher from './components/Searcher';
import GiftStack from './components/GiftStack';

const GiftList = () => {
    const { giftListAccess } = useHistoric();
    const { isSignedIn, id } = useIdentityContext();
    const [gifts, setGifts] = useState<GiftType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const toast = useToast();

    useEffect(() => {
        const fetchGifts = async () => {
            setIsLoading(true);
            try {
                const response = await api.get("/gift");
                setGifts(response.data)
            }
            catch(err: any) {
                toast({
                    status: 'error',
                    title: 'Falha!',
                    description: 'Não foi possível carregar a lista de presentes. Por favor, tente novamente mais tarde.',
                    duration: 1000*5,
                    isClosable: true,
                })
            }
            finally {
                setIsLoading(false);
            }

        }

        fetchGifts();
    }, [])

    useEffect(() => {
        giftListAccess({ aditionalData: { isSignedIn, guestId: id } });
    }, [isSignedIn, id])

    return (
        <>
            <Box bgImage={Texture} bgSize='4px' minH='100vh' w='full' pb='32'>
                <Box pt='6' mx='auto' w='max-content'>
                    <Link to="/">
                        <Image src={Brand} w='16' mx='auto' />
                    </Link>
                    <Text textAlign='center' fontSize='sm' mt='2' fontWeight='medium'>LISTA DE PRESENTES</Text>
                </Box>

                <Box px='6' w='full' maxW='container.lg' mx='auto' mt='12'>

                    <Box>
                        {!!isLoading ? (
                            <Box textAlign='center'>
                                <Spinner color='gray.500' mb='2' />
                                <Text color='gray.500' fontWeight='semibold' fontSize='sm'>CARREGANDO</Text>
                            </Box>
                        ) :
                            <>
                                <Flex justifyContent='end' mb='4'>
                                    <Searcher gifts={gifts} />
                                </Flex>
                                
                                <GiftStack gifts={gifts} />
                            </>
                        }
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default GiftList;
