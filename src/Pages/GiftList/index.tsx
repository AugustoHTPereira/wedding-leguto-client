import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, StackItem, Text, useDisclosure, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, StackDivider, GridItem, Button } from '@chakra-ui/react';
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

    useEffect(() => {
        const fetchGifts = async () => {
            const response = await api.get("/gift");
            setGifts(response.data)
        }

        fetchGifts();
    }, [])

    useEffect(() => {
        giftListAccess({aditionalData: { isSignedIn, guestId: id }});
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
                    <Flex justifyContent='end' mb='4'>
                        <Searcher gifts={gifts} />
                    </Flex>

                    <Box>
                        <GiftStack gifts={gifts} />
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default GiftList;
