import React, { useCallback, useEffect, useState } from 'react';
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
    ModalBody,
    Input,
    StackDivider,
    SimpleGrid,
    GridItem,
    Button,
    Tooltip,
} from '@chakra-ui/react';

import Texture from '../../Assets/img/absurdity.png';
import Brand from '../../Assets/img/brand.svg';
import { ArrowForwardIcon, ChevronRightIcon, LinkIcon, Search2Icon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import JaparatingaImage from '../../Assets/img/japaratinga.jpeg';
import { GiftType } from '../../Contracts/Gifts';
import api from '../../Services/API';
import useIdentityContext from '../../Contexts/IdentityContext';

const GiftList = () => {
    const [gifts, setGifts] = useState<GiftType[]>([]);

    useEffect(() => {
        const fetchGifts = async () => {
            const response = await api.get("/gift");
            setGifts(response.data)
        }


        fetchGifts();
    }, [])
    
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
                        {/* <GuestGifts /> */}
                        <Searcher gifts={gifts} />
                    </Flex>

                    <Box>
                        <Box mb='4'>
                            <Text fontWeight='semibold' mb='1'>Links de pagamento</Text>
                        </Box>
                        
                        <SimpleGrid mb='12' templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gridGap={{ base: '2', md: '4' }}>
                            <JokeGift />
                        </SimpleGrid>

                        <GiftStack gifts={gifts.filter(x => x.type === "external_link" || !x.type)} />
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default GiftList;

interface SearcherProps {
    gifts: GiftType[]
}

const Searcher = ({ gifts }: SearcherProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState<string>('');

    return (
        <>
            <IconButton aria-label='search' icon={<Search2Icon />} colorScheme='teal' onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Input value={search} onChange={e => setSearch(e.target.value)} variant='flushed' placeholder='Digite aqui para buscar' />
                    </ModalHeader>
                    <ModalBody>
                        <VStack spacing='2' divider={<StackDivider />}>
                            {
                                !!search && gifts.filter(x => x.title.toLowerCase().includes(search.toLowerCase())).map(gift => (
                                    <StackItem key={gift.title} w='full'>
                                        <Flex w='full' justifyContent='space-between'>
                                            <Box>
                                                <Text fontWeight='semibold'>{gift.title}</Text>
                                            </Box>
                                            <IconButton disabled={gift.obtained} as='a' href={gift.link} aria-label={`Ver lista ${gift.title}`} icon={<ArrowForwardIcon />} />
                                            {!!gift.obtained && (<Text>Hmmm... Alguém já reservou esse presente.</Text>)}
                                        </Flex>
                                    </StackItem>   
                                ))
                            }
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

const JokeGift = () => {
    const btnRef = React.useRef<HTMLButtonElement>(null);

    const replaceButton = (e: any) => {
        e && e.preventDefault();

        if (!!btnRef.current) {
            const { innerWidth: width, innerHeight: height } = window;

            const newPosition = {
                x: Math.floor(Math.random() * (width - btnRef.current.clientWidth)),
                y: Math.floor(Math.random() * (height - btnRef.current.clientHeight)),
            }

            console.log(newPosition)

            btnRef.current.style.width = 'max-content';
            btnRef.current.style.position = 'absolute';
            btnRef.current.style.top = newPosition.y + 'px';
            btnRef.current.style.left = newPosition.x + 'px';
            btnRef.current.focus();
        }
    }

    const strPrice = Intl.NumberFormat("pt-br", {currency: 'brl', style: 'currency' }).format(1000000);

    return (
        <GridItem w='full' bg='white' borderRadius='base' boxShadow='base' p='4' as={Flex} flexDirection='column'>
            <Box mb='4'>
                <Image src={JaparatingaImage} w='full' objectFit='cover' h='180px' rounded='base' />
            </Box>

            <Box mb='4' flex='1'>
                <Text fontWeight='semibold' mb='2'>Ir junto na lua de mel</Text>
                <Text fontWeight='normal' fontSize='sm' mb='4'>Acompanhe os pombinhos na viajem pós cerimônia.</Text>
                <Text fontSize='2xl' textAlign='right' lineHeight='1'>{strPrice}</Text>
            </Box>

            <Box>
                <Button w='full' colorScheme='green' onMouseEnter={replaceButton} onClick={replaceButton} ref={btnRef}>
                    Comprar por {strPrice}
                </Button>
            </Box>
        </GridItem>
    )
}

interface GiftCardProps {
    gift: GiftType
}

const GiftCard = ({ gift }: GiftCardProps) => {
    const priceFormatter = Intl.NumberFormat("pt-br", {currency: 'brl', style: 'currency' });
    const formatedPrice = gift.price ? priceFormatter.format(gift.price) : undefined;
    return (
        <GridItem w='full' bg='white' borderRadius='base' boxShadow='base' p='4' as={Flex} flexDirection='column'>
            <Box mb='4' w='full'>
                <Image src={gift.pictureUrl} data-image-url={gift.pictureUrl} w='full' objectFit='cover' h='180px' rounded='base' />
            </Box>

            <Box mb='4' flex='1' w='full'>
                <Text fontWeight='semibold' mb='2'>{gift.title}</Text>
                <Text fontSize='2xl' textAlign='right' lineHeight='1'>{formatedPrice}</Text>
            </Box>

            <Box w='full'>
                <Button w='full' colorScheme='green' as={Link} to={gift.id.toString()} state={{ gift }}>
                    Visualizar
                </Button>
            </Box>
        </GridItem>
    )
}

interface GiftListProps {
    gifts: GiftType[]
}

const GiftStack = ({ gifts }: GiftListProps) => {
    return (
        <Box>
            <Box mb='4'>
                <Text fontWeight='semibold' mb='1'>Lista externa</Text>
                <Text color='gray.500' fontSize='sm'>
                    Querido convidado, não se limite a nossa lista.<br/>Fique a vontade para comprar o presente onde quiser.
                </Text>
            </Box>

            <VStack>
                {
                    gifts.filter(x => !x.obtained).sort((a, b) => a.title > b.title ? 1 : -1).map(gift => (
                        <StackItem key={gift.id} w='full'>
                            <Flex flexDirection={{ base: 'column', lg: 'row' }} align={{lg: 'center'}} justify={{lg: 'space-between'}} bg='white' borderRadius='base' boxShadow='sm' px='4' py='3'>
                                <Box>
                                    <Text fontSize='xs' color='gray.500'>
                                        #{gift.id} - {gift.store}{gift.obtained ? " - ALGUÉM JÁ SEPAROU ESSE PRESENTE" : ""}
                                    </Text>

                                    <Text fontWeight='semibold' color='gray.700'>
                                        {gift.title}
                                    </Text>
                                </Box>

                                <Box>
                                    {/* <IconButton display={{ base: 'none', lg: 'flex' }} fontSize='xl' as={Link} to={gift.id.toString()} state={{ gift }} icon={<ChevronRightIcon />} aria-label="Access external url" colorScheme='green' />
                                    <Button mt='4' display={{ base: 'flex', lg: 'none' }} as={Link} to={gift.id.toString()} state={{ gift }} colorScheme='green'>
                                        Visualizar
                                    </Button> */}

                                    {
                                        !!gift.link && (
                                            <>
                                                <IconButton display={{ base: 'none', lg: 'flex' }} target='_blank' fontSize='xl' as='a' href={gift.link} icon={<ChevronRightIcon />} aria-label="Access external url" colorScheme='green' />
                                                <Button mt='4' display={{ base: 'flex', lg: 'none' }} target='_blank' as='a' href={gift.link} colorScheme='green'>
                                                    Visualizar
                                                </Button>
                                            </>
                                        )
                                    }
                                </Box>
                            </Flex>
                        </StackItem>
                    ))
                }
            </VStack>


            {/* {
                !!gifts.filter(x => !!x.obtained).length && (
                    <>
                        <Box mt='8' mb='4'>
                            <Text fontWeight='semibold' mb='1'>Presentes já separados</Text>
                            <Text color='gray.500' fontSize='sm'>
                                Alguém já separou esses presentes.
                            </Text>
                        </Box>

                        <VStack>
                            {
                                gifts.filter(x => !!x.obtained).map(gift => (
                                    <StackItem key={gift.id} w='full'>
                                        <Flex align='center' justify='space-between' cursor='pointer' bg='white' borderRadius='base' boxShadow='sm' px='4' py='3'>
                                            <Box>
                                                <Text fontSize='xs' color='gray.500'>
                                                    #{gift.id} - {gift.store}{gift.obtained ? " - ALGUÉM JÁ SEPAROU ESSE PRESENTE" : ""}
                                                </Text>

                                                <Text fontWeight='semibold' color='gray.700'>
                                                    {gift.title}
                                                </Text>
                                            </Box>
                                            <Box>
                                                <IconButton display={{ base: 'none', lg: 'flex' }} fontSize='xl' as={Link} to={gift.id.toString()} state={{ gift }} icon={<ChevronRightIcon />} aria-label="Access external url" />
                                                <Button mt='4' display={{ base: 'flex', lg: 'none' }} as={Link} to={gift.id.toString()} state={{ gift }}>
                                                    Visualizar
                                                </Button>
                                            </Box>
                                        </Flex>
                                    </StackItem>
                                ))
                            }
                        </VStack>
                    </>
                )
            } */}
        </Box>
    )
}

const GuestGifts = () => {
    const { isSignedIn } = useIdentityContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [gifts, setGifts] = useState<GiftType[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const response = await api.get("/gift/take");
            setGifts(response.data);
        }

        if (isOpen)
            fetch();
    }, [isOpen])

    if (!isSignedIn) return null;

    return (
        <>
            <Button mr='4' onClick={onOpen}>Meus presentes</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Meus presentes
                    </ModalHeader>
                    <ModalBody>
                        <VStack divider={<StackDivider />} spacing='2'>
                            {
                                gifts.map(gift => (
                                    <StackItem w='full'>
                                        <Link to={gift.id.toString()} state={{ gift }}>
                                            {gift.title}
                                        </Link>
                                    </StackItem>
                                ))
                            }
                        </VStack>

                        {!gifts.length && <Text>Você ainda não selecionou nenhum presente</Text>}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}