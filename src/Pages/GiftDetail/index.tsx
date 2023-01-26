import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertIcon, Box, Button, Flex, FormControl, FormLabel, HStack, IconButton, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PinInput, PinInputField, Skeleton, SkeletonText, StackDivider, StackItem, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';
import useIdentityContext, { SigninParams } from '../../Contexts/IdentityContext';
import { GiftType } from '../../Contracts/Gifts';
import Texture from '../../Assets/img/absurdity.png';
import Brand from '../../Assets/img/brand.svg';
import { Link } from 'react-router-dom';
import api from '../../Services/API';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import ButtonRedirect from './components/ButtonRedirect';

const GiftDetail = () => {
    const { id } = useParams();
    const { id: guestId, isSignedIn, isLoading: isSigning, signin, name } = useIdentityContext();
    const [ gift, setGift ] = useState<GiftType>({} as GiftType);
    const [ isFetching, setIsFetching ] = useState<boolean>(true);
    const [ iTake, setITake ] = useState<boolean>(false);
    const navigate = useNavigate();
    const toast = useToast();

    const fetch = async () => {
        try {
            setIsFetching(true);
            const response = await api.get("/gift/" + id);
            setGift(response.data);
        } catch (error) {
            
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        fetch();
    }, [id])

    useEffect(() => {
        setITake(!!gift.guestsId?.filter(x => x == guestId)?.length ?? false)
    }, [gift, guestId])

    const back = () => navigate(-1)

    const unTake = async () => {
        await api.delete(`/gift/${id}/take`)
        setGift(prev => ({...prev, obtained: false }))
    }

    const onTake = () => {
        setGift(prev => ({...prev, obtained: true, guestsId: [ guestId ] }))
        toast({
            title: "Sucesso!",
            description: "Você selecionou o presente. Essa informação é sigilosa, apenas você e os noivos podem vê-la.",
            status: 'success'
        })
    }

    return (
        <>
            <Box bgImage={Texture} bgSize='4px' minH='100vh' w='full' pb='32' px='6'>
                <Box pt='6' mx='auto' w='max-content'>
                    <Link to="/">
                        <Image src={Brand} w='16' mx='auto' />
                    </Link>
                    <Text textAlign='center' fontSize='sm' mt='2' fontWeight='medium'>LISTA DE PRESENTES</Text>
                    {!!name && <Text textAlign='center' fontSize='sm' mt='0' color='gray.400' fontWeight='medium'>Oi {name}!</Text>}
                </Box>

                <Box pt='4'  w='full' maxW='container.sm' mx='auto'>
                    <IconButton mb='4' variant='outline' icon={<ChevronLeftIcon />} aria-label="back" onClick={back} />

                    {isFetching ? <Skeleton w='10' h='4' /> : <Text color='gray.400' fontSize='xs'>#{id} - {gift.title}</Text>}
                
                    {!isFetching && !gift && (
                        <Flex w='full' alignItems='center' justify='center' textAlign='center'>
                            <Text>Hmmmm.. Não estamos encontrando esse presente.</Text>
                            <Text>Os noivos já foram contatados e logo já devem arrumar isso.</Text>
                        </Flex>
                    )}

                    {
                        gift.pictures && (
                            <Flex align='center' justify='center' p='4' bg='white' w={{ base: 'full', md: '44' }} h='44' shadow='sm' mt='4' borderRadius='base'>
                                <Image src={gift.pictures[0]} w='full' h='36' objectFit='contain' borderRadius='base' />
                            </Flex>
                        )
                    }

                    {isFetching ? <Skeleton w='72' h='8' mt='4' /> : <Text mt='4' color='gray.700' fontSize='2xl' fontWeight='semibold'>{gift?.title}</Text>}

                    {!!gift?.obtained && !isFetching && !iTake && (
                        <Alert status='warning' mt='6'>
                            <AlertIcon />
                            <AlertDescription>
                                Hmmmm.. Parece que alguém já vai dar esse presente.
                            </AlertDescription>
                        </Alert>
                    )}

                    {!!gift?.obtained && !isFetching && !!iTake && (
                        <Alert status='success' mt='6'>
                            <AlertIcon />
                            <AlertDescription>
                                <Box>
                                    <Text>Você selecionou esse presente.</Text>
                                    <Button onClick={unTake} size='sm' mt='2' colorScheme='red'>Vou trocar de presente</Button>
                                </Box>
                            </AlertDescription>
                        </Alert>
                    )}

                    

                    {
                        isFetching ? (
                            <Box mt='8'>
                                <Skeleton w='72' h='6' mb='1' />
                                <Skeleton w='24' h='6' mb='1' />
                                <Skeleton w='32' h='6' mb='1' />
                                <Skeleton w='56' h='6' mb='1' />
                            </Box>
                        ) : !!gift?.metadata && (
                            <VStack divider={<StackDivider />} mt='8' color='gray.500' spacing='1' fontSize='md'>
                                <StackItem w='full'>
                                    <Text>{gift.category}</Text>
                                </StackItem>
                                {
                                    gift?.metadata && gift.metadata.map(meta => (
                                        <StackItem key={meta.key} w='full'>
                                            {meta.key === "Voltage" && meta.value === "220V" ? (<Text color='red' fontWeight='bold'>Voltagem: 220V</Text>) : (<Text>{meta.key}: {meta.value}</Text>)}
                                        </StackItem>
                                    ))
                                }
                            </VStack>
                        )
                    }

                    {isFetching ? <Skeleton w='full' h='12' mt='6' /> : !!gift && <TakeModal beforeTake={onTake} isSignedIn={isSignedIn} isSigning={isSigning} signin={signin} gift={gift} />}
                    {isFetching ? <Skeleton w='full' h='12' mt='2' /> : <ButtonRedirect gift={gift} />}

                    <Box mt='4' color='gray.400' textAlign='center'>
                        <Text>Querido convidado, não se limite a nossa lista.<br/>Fique a vontade para comprar o presente onde quiser.</Text>
                    </Box>

                    <Box mt='10'>
                        {isFetching ? <><SkeletonText maxW='400px' /><SkeletonText mt='4' maxW='600px' /><SkeletonText mt='4' maxW='200px' /></> : (
                            <Box>
                                <Text color='gray.700' fontWeight='semibold' fontSize='sm'>Endereço para entregas</Text>

                                <VStack spacing='1' fontSize='md' mt='4' divider={<StackDivider />} color='gray.500'>
                                    <StackItem w='full'>
                                        Rua: Antônio Andrade Mendes
                                    </StackItem>
                                    <StackItem w='full'>
                                        Bairro: Jardim Primavera
                                    </StackItem>
                                    <StackItem w='full'>
                                        Nº 117
                                    </StackItem>
                                    <StackItem w='full'>
                                        Monsenhor Paulo - MG
                                    </StackItem>
                                    <StackItem w='full'>
                                        CEP: 37405-000
                                    </StackItem>
                                    <StackItem w='full'>
                                        Referência: Casa do Sionel - Ao lado da Serralheria D'Stak
                                    </StackItem>

                                    <StackItem fontSize='xs' textAlign='center'>37405-000, Monsenhor Paulo - MG, Rua Antônio Andrade Mendes, 117, Bairro Jardim Primavera, Casa, Casa do Sionel ao lado da Serralheria D'Stak</StackItem>
                                </VStack>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default GiftDetail;

interface TakeModalProps {
    gift: GiftType,
    isSignedIn: boolean,
    isSigning: boolean,
    signin: (params: SigninParams) => Promise<void>,
    beforeTake: () => void,
}

const TakeModal = ({ gift, isSignedIn, isSigning, signin, beforeTake }: TakeModalProps) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [ code, setCode ] = useState<string>("")
    const [ isTaking, setIsTaking ] = useState<boolean>(false);

    const onButtonClick = async () => {
        if (!isSignedIn) {
            onOpen();
            return;
        }

        await take();
    }

    const onLogin = async () => {
        console.log("Login with code ", code);
        await signin({ code });
        await take();
        onClose();
    }

    const take = async () => {
        setIsTaking(true);
        await api.post(`/gift/${gift.id}/take`)
        beforeTake();
        onClose();
        setIsTaking(false);
    }

    return (
        <>
            <Button disabled={!!gift.obtained} isLoading={isTaking} w='full' mt='6' colorScheme='teal' onClick={onButtonClick}>Esse eu vou dar</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Acessar
                    </ModalHeader>

                    <ModalBody>
                        <FormControl>
                            <FormLabel>Informe o código contido no convite:</FormLabel>
                            <HStack>
                                <PinInput value={code} onChange={setCode}>
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>
                            </HStack>
                        </FormControl>
                        <Text color='gray.400' mt='2' fontSize='sm'>O código está disponível abaixo do QRCode no seu convite. Ex.: leguto.co/<b>{"<código>"}</b></Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={isSigning} colorScheme='teal' w='full' onClick={onLogin}>Pronto</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}