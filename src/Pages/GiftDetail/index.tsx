import React, { useEffect, useState } from 'react';
import { Box, Button, HStack, IconButton, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PinInput, PinInputField, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { GiftType } from '../../Contracts/Gifts';
import Texture from '../../Assets/img/absurdity.png';
import Brand from '../../Assets/img/brand.svg';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import api from '../../Services/API';
import useIdentityContext from '../../Contexts/IdentityContext';

const GiftDetail = () => {
    const { isSignedIn, id, signin, isLoading: isSigninLoading } = useIdentityContext();
    const [isTaking, setIsTaking] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ code, setCode ] = useState<string>('')
    const toast = useToast({ isClosable: true });

    const navigate = useNavigate();
    const { state: { gift: _gift } } = useLocation();

    const [gift, setGift] = useState<GiftType>(_gift as GiftType);

    const getGiftDetails = async () => {
        const response = await api.get("/gift/"+ _gift.id)
        setGift(response.data)
    }

    useEffect(() => {
        getGiftDetails();
    }, [])

    const goBack = () => navigate(-1);

    const take = async () => {
        if (!isSignedIn) {
            onOpen();
            return;
        }

        setIsTaking(true)
        try {
            await api.post(`/gift/${gift.id}/take`);
            await getGiftDetails();
            toast({
                description: "Beleza. Nós assinalamos esse presente lá na lista como reservado. Se você quiser alterar seu presente, não se esqueça de desmarcar esse aqui pra que outro convidado possa nos presentear ok?!",
                title: "Presente reservado!",
                status: 'success'
            })
        } finally {
            setIsTaking(false);
        }
    }

    const untake = async () => {
        setIsTaking(true)
        try {
            await api.delete(`/gift/${gift.id}/take`);
            await getGiftDetails();
            toast({
                title: 'Sucesso',
                description: "Beleza. Nós liberamos esse presente lá na lista de presentes para os outros convidados.",
                status: 'success'
            })
        } finally {
            setIsTaking(false);
        }
    }

    const handleLogin = async () => {
        await signin({ code })
        
        await api.post(`/gift/${gift.id}/take`);
        toast({
            description: "Beleza. Nós assinalamos esse presente lá na lista como reservado. Se você quiser alterar seu presente, não se esqueça de desmarcar esse aqui pra que outro convidado possa nos presentear ok?!",
            title: "Presente reservado!",
            status: 'success'
        })
        onClose();
        await getGiftDetails();
    }

    if (!gift) {
        return <Navigate to="/not-found" />
    }

    return (
        <>
            <Box bgImage={Texture} bgSize='4px' minH='100vh' w='full' pb='32'>
                <Box pt='6' mx='auto' w='max-content'>
                    <Link to="/">
                        <Image src={Brand} w='16' mx='auto' />
                    </Link>
                    <Text textAlign='center' fontSize='sm' mt='2' fontWeight='medium'>LISTA DE PRESENTES</Text>
                </Box>
                <Box px='6' w='full' maxW='container.sm' mx='auto' mt='12'>
                    <Box>
                        <IconButton onClick={goBack} aria-label='back' icon={<ChevronLeftIcon />} fontSize='xl' mb='4' />
                    </Box>

                    <Box mb='12'>
                        <Text fontWeight='bold' fontSize='4xl'>
                            {gift.title}
                        </Text>

                    </Box>

                    <Box>
                        {
                            !gift.obtained ? (
                                <>
                                    <Button w='full' mb='2' as='a' target='_blank' href={gift.link}>
                                        Acessar {gift.store}
                                    </Button>
                                    
                                    <Button isLoading={isSigninLoading || isTaking} w='full' onClick={take} colorScheme='green'>
                                        Esse eu vou dar!
                                    </Button>
                                </>
                            ) : !!gift.guestsId?.includes(id) ? (
                                <>
                                    <Button w='full' mb='2' as='a' target='_blank' href={gift.link}>
                                        Acessar {gift.store}
                                    </Button>
                                    
                                    <Button isLoading={isSigninLoading || isTaking} w='full' onClick={untake} colorScheme='red' variant='outline'>
                                        Eu vou trocar meu presente {':('}
                                    </Button>
                                </>
                            ) : (
                                <Box bg='gray.100' p='4' borderRadius='base' w='full' textAlign='center' color='gray.500'>
                                    Hmmm... Parece que alguém já vai nos dar esse presente.
                                </Box>
                            )
                        }
                    </Box>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader textAlign='center'>
                        Antes de prosseguir, informe o código do seu convite.
                    </ModalHeader>

                    <ModalBody>
                        <HStack mx='auto' justify='center'>
                            <PinInput value={code} onChange={setCode}>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleLogin} colorScheme='teal' w='full'>Prosseguir</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GiftDetail;