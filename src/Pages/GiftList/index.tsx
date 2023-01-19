import React, { useState } from 'react';
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
import { ArrowForwardIcon, LinkIcon, Search2Icon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import JaparatingaImage from '../../Assets/img/japaratinga.jpeg';
import { Gifts, GiftType } from '../../Contracts/Gifts';

const GiftList = () => {
    const [gifts, setGifts] = useState<GiftType[]>(Gifts);
    
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
                        <SimpleGrid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gridGap={{ base: '2', md: '4' }}>
                                <JokeGift />

                            <>
                                {
                                    gifts.map(({name, type, url, price, description, pictureUrl}) => {
                                        return (
                                            <GiftCard type={type} name={name} pictureUrl={pictureUrl} price={price} description={description} url={url} />
                                        )
                                    })
                                }
                            </>
                        </SimpleGrid>
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
                <Text fontWeight='semibold'>Ir junto na lua de mel</Text>
                <Text fontWeight='normal'>Acompanhe os pombinhos na viajem pós cerimônia.</Text>
                <Text fontSize='2xl' textAlign='right' mt='2' lineHeight='1'>{strPrice}</Text>
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
    name: string,
    description?: string,
    pictureUrl: string,
    price?: number,
    type: string,
    url: string,
}

const GiftCard = ({ name, description, pictureUrl, price, url, type }: GiftCardProps) => {
    const priceFormatter = Intl.NumberFormat("pt-br", {currency: 'brl', style: 'currency' });
    const formatedPrice = price ? priceFormatter.format(price) : undefined;

    return (
        <GridItem w='full' bg='white' borderRadius='base' boxShadow='base' p='4' as={Flex} flexDirection='column'>
            <Box mb='4'>
                <Image src={pictureUrl} data-image-url={pictureUrl} w='full' objectFit='cover' h='180px' rounded='base' />
            </Box>

            <Box mb='4' flex='1'>
                <Text fontWeight='semibold'>{name}</Text>
                {!!description && <Text fontWeight='normal'>{description}</Text>}
                <Text fontSize='2xl' textAlign='right' mt='2' lineHeight='1'>{formatedPrice}</Text>
            </Box>

            <Box>
                <Button w='full' colorScheme='green' href={url} as='a'>
                    {type === 'external_list' ? 'Acessar ' + name : !!formatedPrice ? `Comprar por ${formatedPrice}` : 'Comprar'}
                </Button>
            </Box>
        </GridItem>
    )
}

interface GiftTypeIconProps {
    type: string,
}
