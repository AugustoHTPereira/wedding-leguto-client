import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text, Spinner, useToast, SimpleGrid, GridItem, HStack, StackItem, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure, DrawerCloseButton, VStack, StackDivider, Icon, keyframes, usePrefersReducedMotion, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GiftType } from '../../Contracts/Gifts';
import api from '../../Services/API';
import useIdentityContext from '../../Contexts/IdentityContext';
import useHistoric from '../../Hooks/useHistoric';
import HomeNavbar from '../Home/components/HomeNavbar';
import { CheckIcon, Search2Icon } from '@chakra-ui/icons';

const GIFT_SHOWN_KEYFRAME = keyframes`
    from {opacity: 0;}
    to {opacity: 1;}
`

const GiftList = () => {
    const { giftListAccess } = useHistoric();
    const { isSignedIn, id } = useIdentityContext();
    const [gifts, setGifts] = useState<GiftType[]>([]);
    const [displayGifts, setDisplayGifts] = useState<GiftType[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const toast = useToast();

    useEffect(() => {
        const fetchGifts = async () => {
            setIsLoading(true);
            try {
                const response = await api.get("/gift");
                setGifts(response.data)
            }
            catch (err: any) {
                toast({
                    status: 'error',
                    title: 'Falha!',
                    description: 'Não foi possível carregar a lista de presentes. Por favor, tente novamente mais tarde.',
                    duration: 1000 * 5,
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

    const onFilterChanged = ({ selectedCategories }: { selectedCategories: string[] }) => {
        if (selectedCategories.length > 0) {
            console.log(gifts.filter(x => selectedCategories.indexOf(x.category) !== -1))
            setDisplayGifts(gifts.filter(x => selectedCategories.indexOf(x.category) !== -1))
        } else {
            setDisplayGifts(gifts)
        }
    }

    useEffect(() => {
        setDisplayGifts(gifts)
    }, [gifts])

    const motionReduced = usePrefersReducedMotion();
    const animation = (index: number) => motionReduced
        ? undefined 
        : `${GIFT_SHOWN_KEYFRAME} ${index}00ms ease-in-out`;

    return (
        <>
            <Box
                w='full'
                minH='100vh'
                bg='black'
            >
                <HomeNavbar />

                <Box px='6'>
                    <Box
                        w='full'
                        maxW='container.xl'
                        mx='auto'
                        pt='20'
                        pb='16'
                    >
                        <Box
                            mb='12'
                        >
                            <Text
                                textAlign='center'
                                color='white'
                                fontSize='4xl'
                                fontWeight='bold'
                                mb='6'
                            >
                                Lista de presentes
                            </Text>
                        </Box>

                        {
                            !!isLoading && (
                                <Box mx='auto' textAlign='center' color='white'>
                                    <Spinner />
                                    <Text>Carregando presentes</Text>
                                </Box>
                            )
                        }

                        {
                            !!displayGifts && (
                                <>
                                    <Flex justify='end'>
                                        <DrawerFilter
                                            availableCategories={gifts.map(x => x.category).filter((el, index, arr) => arr.indexOf(el) == index).map(cat => ({
                                                name: cat,
                                                gifts: gifts.filter(x => x.category === cat).length
                                            }))}
                                            onChange={onFilterChanged}
                                        />
                                    </Flex>

                                    {
                                        displayGifts.map(x => x.category).filter((el, index, arr) => arr.indexOf(el) == index).map(x => {
                                            const categoryGifts = displayGifts.filter(y => y.category === x);

                                            return (
                                                <Box mb='24'>
                                                    <Text
                                                        mb='4'
                                                        color='white'
                                                        fontWeight='semibold'
                                                        textAlign='center'
                                                    >
                                                        {x}
                                                    </Text>
                                                    <SimpleGrid
                                                        templateColumns={{ base: '1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}
                                                        gap='4'
                                                        color='gray.900'
                                                    >
                                                        {
                                                            categoryGifts.map((gift, index) => (
                                                                <GridItem
                                                                    key={gift.id}
                                                                    border='1px solid'
                                                                    borderColor='gray.900'
                                                                    rounded='lg'
                                                                    bg='white'
                                                                    as={Link}
                                                                    to={gift.id.toString()}
                                                                    animation={animation(index)}
                                                                    pb='4'
                                                                    position='relative'
                                                                >
                                                                    {
                                                                        gift.obtainedByMe ? (
                                                                            <Badge
                                                                                variant='solid'
                                                                                whiteSpace='break-spaces'
                                                                                position='absolute'
                                                                                top='50%'
                                                                                transform='translateY(-40px)'
                                                                                textAlign='center'
                                                                                p='2'
                                                                                left='6'
                                                                                right='6'
                                                                                colorScheme='success'
                                                                                zIndex='9'
                                                                            >
                                                                                Obrigado! Você selecionou este presente.
                                                                            </Badge>
                                                                        ) : gift.obtained ? (
                                                                            <Badge
                                                                                variant='solid'
                                                                                whiteSpace='break-spaces'
                                                                                position='absolute'
                                                                                top='50%'
                                                                                transform='translateY(-40px)'
                                                                                textAlign='center'
                                                                                p='2'
                                                                                left='6'
                                                                                right='6'
                                                                                colorScheme='red'
                                                                                zIndex='9'
                                                                            >
                                                                                Este presente já foi selecionado por alguém.
                                                                            </Badge>
                                                                        ) : null
                                                                    }
                                                                    <Box w='full'>
                                                                        <Box w='full' p='8' mb='4'>
                                                                            {
                                                                                !!gift.pictures && <Image filter={gift.obtained ? 'blur(2px) grayscale(1)' : undefined} borderRadius='6px' w='full' h='44' objectFit='contain' src={gift.pictures[0]} />
                                                                            }
                                                                        </Box>
                                                                        <Box px='6' mb='1' h='16'>
                                                                            <Text noOfLines={2} fontWeight='semibold'>{gift.title}</Text>
                                                                        </Box>
                                                                        <Box px='6'>
                                                                            <Text>
                                                                                Ver presente
                                                                            </Text>
                                                                        </Box>
                                                                    </Box>
                                                                </GridItem>
                                                            ))
                                                        }
                                                    </SimpleGrid>
                                                </Box>
                                            )
                                        })
                                    }
                                </>
                            )
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default GiftList;

interface DrawerFilterProps {
    availableCategories?: { name: string, gifts: number }[],
    onChange?: ({ }: { selectedCategories: string[], }) => void,
}

const DrawerFilter = ({ availableCategories, onChange }: DrawerFilterProps) => {
    const { onOpen, ...rest } = useDisclosure();
    const [selectedCategories, setSelectedCategories] = useState<string[]>(availableCategories?.map(x => x.name) || []);

    const onToggleCategory = (categoryName: string) => {
        if (selectedCategories.indexOf(categoryName) === -1) {
            console.log(`add category ${categoryName}`)
            setSelectedCategories(prev => !!prev ? ([...prev, categoryName]) : ([categoryName]));
        } else {
            console.log(`remove category ${categoryName}`)
            setSelectedCategories(prev => !!prev ? prev.filter(x => x !== categoryName) : ([]));
        }
    }

    useEffect(() => {
        !!onChange && onChange({
            selectedCategories
        })
    }, [selectedCategories])

    return (
        <>
            <IconButton
                aria-label='Aplicar filtro'
                size='lg'
                colorScheme='teal'
                icon={<Search2Icon />}
                onClick={onOpen}
            />

            <Drawer {...rest} size='md'>
                <DrawerOverlay />
                <DrawerContent bg='black' color='white'>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        Aplicar filtro
                    </DrawerHeader>
                    <DrawerBody>
                        <Box mb='8'>
                            <Text mb='2' fontWeight='semibold' fontSize='lg'>Categorias</Text>
                            <VStack spacing='2' divider={<StackDivider borderColor='gray.800' />}>
                                {
                                    !!availableCategories && (
                                        availableCategories.map(cat => (
                                            <StackItem
                                                key={cat.name}
                                                w='full'
                                                onClick={e => onToggleCategory(cat.name)}
                                                cursor='pointer'
                                            >
                                                <Flex align='center' justify='space-between'>
                                                    <Text textTransform='capitalize'>{cat.name.toLowerCase()}</Text>

                                                    {
                                                        selectedCategories.indexOf(cat.name) !== -1 && (
                                                            <Box>
                                                                <CheckIcon />
                                                            </Box>
                                                        )
                                                    }
                                                </Flex>
                                            </StackItem>
                                        ))
                                    )
                                }
                            </VStack>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
