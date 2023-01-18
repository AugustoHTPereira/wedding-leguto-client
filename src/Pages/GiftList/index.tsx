import React, { useEffect, useState } from 'react';
import { 
    Box, 
    Flex, 
    IconButton, 
    Image, 
    StackItem, 
    Text, 
    useDisclosure, 
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    StackDivider,
} from '@chakra-ui/react';

import Texture from '../../Assets/img/absurdity.png';
import Brand from '../../Assets/img/brand.svg';
import { ArrowForwardIcon, Search2Icon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

interface GiftType {
    name: string,
    type: string,
    url: string,
    price?: number
}

const GiftList = () => {
    const [gifts, setGifts] = useState<GiftType[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState<string>('');

    const btnRef = React.useRef<HTMLButtonElement>(null);

    const replaceButton = () => {
        if (!!btnRef.current) {
            const { innerWidth: width, innerHeight: height } = window;

            const newPosition = {
                x: Math.floor(Math.random() * (width - 10)),
                y: Math.floor(Math.random() * (height - 10)),
            }

            console.log(newPosition)

            btnRef.current.style.position = 'fixed';
            btnRef.current.style.top = newPosition.y + 'px';
            btnRef.current.style.left = newPosition.x + 'px';
            btnRef.current.focus();
        }
    }
    
    return (
        <>
            <Box bgImage={Texture} bgSize='4px' minH='100vh' w='full'>
                <Box pt='6' mx='auto' w='max-content'>
                    <Link to="/">
                        <Image src={Brand} w='16' mx='auto' />
                    </Link>
                    <Text textAlign='center' fontSize='sm' mt='2' fontWeight='medium'>LISTA DE PRESENTES</Text>
                </Box>

                <Box px='6' w='full' maxW='container.sm' mx='auto' mt='12'>
                    <Flex justifyContent='end' p='4'>
                        <IconButton aria-label='search' icon={<Search2Icon />} colorScheme='teal' onClick={onOpen} />
                    </Flex>

                    <VStack mb='8' spacing='2'>
                        {
                            gifts.filter(x => x.type !== "payment-link").map(gift => (
                                <StackItem key={gift.name} w='full'>
                                    <Flex w='full' justifyContent='space-between' bg='white' borderRadius='base' boxShadow='sm' p='4'>
                                        <Box>
                                            <Text fontWeight='semibold'>{gift.name}</Text>
                                            {
                                                gift.price && (
                                                    <Text color='gray.500' fontSize='sm' fontStyle='italic' lineHeight='1'>{gift.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                                                )
                                            }
                                        </Box>
                                        <IconButton as='a' target='_blank' href={gift.url} aria-label={`Ver lista ${gift.name}`} icon={<ArrowForwardIcon />} />
                                    </Flex>
                                </StackItem>    
                            ))
                        }
                    </VStack>

                    {/* <Box mb='2' fontWeight='semibold' fontSize='sm'>
                        Mimos para os noivos
                    </Box>

                    <VStack spacing='2'>
                        <StackItem key={'joke'} w='full'>
                            <Flex w='full' justifyContent='space-between' bg='white' borderRadius='base' boxShadow='sm' p='4'>
                                <Box>
                                    <Text fontWeight='semibold'>Ir junto na lua de mel</Text>
                                    <Text color='gray.500' fontSize='sm' fontStyle='italic' lineHeight='1'>R$ 1.000.000,00</Text>
                                </Box>
                                <IconButton ref={btnRef} onClick={replaceButton} aria-label={`Presente`} icon={<ArrowForwardIcon />} />
                            </Flex>
                        </StackItem>
                        
                        {
                            gifts.filter(x => x.type === "payment-link").map(gift => (
                                <StackItem key={gift.name} w='full'>
                                    <Flex w='full' justifyContent='space-between' bg='white' borderRadius='base' boxShadow='sm' p='4'>
                                        <Box>
                                            <Text fontWeight='semibold'>{gift.name}</Text>
                                            {
                                                gift.price && (
                                                    <Text color='gray.500' fontSize='sm' fontStyle='italic' lineHeight='1'>{gift.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                                                )
                                            }
                                        </Box>
                                        <IconButton as='a' target='_blank' href={gift.url} aria-label={`Ver lista ${gift.name}`} icon={<ArrowForwardIcon />} />
                                    </Flex>
                                </StackItem>    
                            ))
                        }
                    </VStack> */}

                    <Text color='gray.700' fontSize='xs' fontWeight='semibold' textAlign='center'>
                        Nós ainda estamos construindo nossa lista de presentes.<br/>
                        Vamos te avisar quando estiver tudo aqui.
                    </Text>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Input value={search} onChange={e => setSearch(e.target.value)} variant='flushed' placeholder='Digite aqui para buscar' />
                    </ModalHeader>
                    <ModalBody>
                        <VStack spacing='2' divider={<StackDivider />}>
                            {
                                !!search && gifts.filter(x => x.name.toLowerCase().includes(search.toLowerCase())).map(gift => (
                                    <StackItem key={gift.name} w='full'>
                                        <Flex w='full' justifyContent='space-between'>
                                            <Box>
                                                <Text fontWeight='semibold'>{gift.name}</Text>
                                                {
                                                    gift.price && (
                                                        <Text color='gray.500' fontSize='sm' fontStyle='italic' lineHeight='1'>{gift.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                                                    )
                                                }
                                            </Box>
                                            <IconButton as='a' href={gift.url} aria-label={`Ver lista ${gift.name}`} icon={<ArrowForwardIcon />} />
                                        </Flex>
                                    </StackItem>   
                                ))
                            }
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GiftList;