import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text, Spinner, useToast, SimpleGrid, GridItem, HStack, StackItem, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure, DrawerCloseButton, VStack, StackDivider, Icon, keyframes, usePrefersReducedMotion, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GiftType } from '../../Contracts/Gifts';
import api from '../../Services/API';
import useIdentityContext from '../../Contexts/IdentityContext';
import useHistoric from '../../Hooks/useHistoric';
import HomeNavbar from '../Home/components/HomeNavbar';
import { CheckIcon, Search2Icon } from '@chakra-ui/icons';
import { IoGrid, IoList } from 'react-icons/io5'
import useGifts from '../../Hooks/useGifts';

const GiftList = () => {
    const { giftListAccess } = useHistoric();
    const { isSignedIn, id } = useIdentityContext();
    const [listType, setListType] = useState<'list' | 'grid'>('grid');
    const { applyFilter, gifts, isLoading, categories } = useGifts();

    useEffect(() => {
        giftListAccess({ aditionalData: { isSignedIn, guestId: id } });
    }, [isSignedIn, id])

    return (
        <>
            <Box
                w='full'
                minH='100vh'
                bg='black'
            >
                <HomeNavbar />

                <Box px='2'>
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
                            !!gifts?.length && (
                                <>
                                    <Flex justify='end' mb='2'>
                                        <IconButton
                                            aria-label='list-type'
                                            icon={listType === 'grid' ? <IoList /> : <IoGrid />}
                                            onClick={() => setListType(prev => prev === 'grid' ? 'list' : 'grid')}
                                            size='lg'
                                            mr='2'
                                            colorScheme='gray'
                                        />

                                        <DrawerFilter
                                            availableCategories={categories}
                                            onChange={({ selectedCategories }) => applyFilter({ categories: selectedCategories })}
                                        />
                                    </Flex>

                                    {
                                        gifts.map(x => x.category).filter((el, index, arr) => arr.indexOf(el) == index).map(x => {
                                            const categoryGifts = gifts.filter(y => y.category === x);

                                            return (
                                                <Box key={x} mb='24'>
                                                    <Text
                                                        mb='4'
                                                        color='white'
                                                        fontWeight='semibold'
                                                        textAlign='center'
                                                    >
                                                        {x}
                                                    </Text>
                                                    {
                                                        listType === 'grid' ? (
                                                            <SimpleGrid
                                                                templateColumns={{ base: '1fr 1fr', lg: '1fr 1fr 1fr 1fr 1fr 1fr' }}
                                                                gap='2'
                                                                color='gray.900'
                                                            >
                                                                {
                                                                    categoryGifts.sort((a, b) => a.title > b.title ? 1 : -1).map((gift, index) => (
                                                                        <GridItem
                                                                            key={`grid-${index}`}
                                                                            bg='white'
                                                                            borderRadius='base'
                                                                            p='4'
                                                                            cursor='pointer'
                                                                            w='full'
                                                                            as={Link}
                                                                            to={gift.id.toString()}
                                                                        >
                                                                            <Box mb='4'>
                                                                                {
                                                                                    !!gift.pictures &&
                                                                                    <Image
                                                                                        src={gift.pictures[0]}
                                                                                        objectFit='contain'
                                                                                        w='full'
                                                                                        h='32'
                                                                                        filter={gift.obtained ? 'blur(2px) grayscale(1)' : undefined}
                                                                                    />
                                                                                }
                                                                            </Box>

                                                                            <Box minH='12' w='full'>
                                                                                {
                                                                                    gift.obtainedByMe ?
                                                                                        <Text
                                                                                            color='green'
                                                                                            fontSize='xs'
                                                                                            lineHeight='1'
                                                                                            fontWeight='semibold'
                                                                                            mb='2'
                                                                                            textAlign='center'
                                                                                        >
                                                                                            Você selecionou este presente
                                                                                        </Text>
                                                                                        : gift.obtained ?
                                                                                            <Text
                                                                                                color='red'
                                                                                                fontSize='xs'
                                                                                                lineHeight='1'
                                                                                                fontWeight='semibold'
                                                                                                mb='2'
                                                                                                textAlign='center'
                                                                                            >
                                                                                                Este presente já foi selecionado
                                                                                            </Text>
                                                                                            : null
                                                                                }
                                                                                <Text
                                                                                    noOfLines={2}
                                                                                    fontSize='sm'
                                                                                    fontWeight='semibold'
                                                                                    lineHeight='1.1'
                                                                                >
                                                                                    {gift.title}
                                                                                </Text>
                                                                            </Box>

                                                                            <Box>
                                                                                <Text fontSize='xs'>Visualizar presente</Text>
                                                                            </Box>
                                                                        </GridItem>
                                                                    ))
                                                                }
                                                            </SimpleGrid>
                                                        ) : (
                                                            <VStack>
                                                                {
                                                                    categoryGifts.sort((a, b) => a.title > b.title ? 1 : -1).map((gift, index) => (
                                                                        <StackItem
                                                                            key={`list-${index}`}
                                                                            w='full'
                                                                            as={Link}
                                                                            to={gift.id.toString()}
                                                                        >
                                                                            <Flex>
                                                                                <Box
                                                                                    bg='white'
                                                                                    p='2'
                                                                                    borderRadius='base'
                                                                                    w='max-content'
                                                                                >
                                                                                    {
                                                                                        !!gift.pictures &&
                                                                                        <Image
                                                                                            src={gift.pictures[0]}
                                                                                            objectFit='cover'
                                                                                            w='20'
                                                                                            h='20'
                                                                                            filter={gift.obtained ? 'blur(2px) grayscale(1)' : undefined}
                                                                                        />
                                                                                    }
                                                                                </Box>

                                                                                <Flex
                                                                                    flexDirection='column'
                                                                                    justifyContent='space-evenly'
                                                                                    flex='1'
                                                                                    ml='4'
                                                                                    py='2'
                                                                                >
                                                                                    {
                                                                                        gift.obtainedByMe ?
                                                                                            <Text
                                                                                                color='green'
                                                                                                fontSize='xs'
                                                                                                lineHeight='1'
                                                                                                fontWeight='semibold'
                                                                                            >
                                                                                                Você selecionou este presente
                                                                                            </Text>
                                                                                            : gift.obtained ?
                                                                                                <Text
                                                                                                    color='red'
                                                                                                    fontSize='xs'
                                                                                                    lineHeight='1'
                                                                                                    fontWeight='semibold'
                                                                                                >
                                                                                                    Este presente já foi selecionado
                                                                                                </Text>
                                                                                                : null
                                                                                    }

                                                                                    <Text
                                                                                        color='white'
                                                                                        lineHeight='1.2'
                                                                                        fontWeight='semibold'
                                                                                    >
                                                                                        {
                                                                                            gift.title
                                                                                        }
                                                                                    </Text>

                                                                                    <Text
                                                                                        color='white'
                                                                                        fontSize='xs'
                                                                                    >
                                                                                        Visualizar presente
                                                                                    </Text>
                                                                                </Flex>
                                                                            </Flex>
                                                                        </StackItem>
                                                                    ))
                                                                }
                                                            </VStack>
                                                        )
                                                    }
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
    availableCategories?: string[],
    onChange?: ({ }: { selectedCategories: string[], }) => void,
}

const DrawerFilter = ({ availableCategories, onChange }: DrawerFilterProps) => {
    const { onOpen, ...rest } = useDisclosure();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const onToggleCategory = (categoryName: string) => {
        if (selectedCategories.indexOf(categoryName) === -1) {
            setSelectedCategories(prev => !!prev ? ([...prev, categoryName]) : ([categoryName]));
        } else {
            setSelectedCategories(prev => !!prev ? prev.filter(x => x !== categoryName) : ([]));
        }
    }

    useEffect(() => {
        !!onChange && onChange({ selectedCategories })
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
                                                key={cat}
                                                w='full'
                                                onClick={() => onToggleCategory(cat)}
                                                cursor='pointer'
                                            >
                                                <Flex align='center' justify='space-between'>
                                                    <Text textTransform='capitalize'>{cat.toLowerCase()}</Text>

                                                    {
                                                        selectedCategories.indexOf(cat) !== -1 && (
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
                </DrawerContent>
            </Drawer>
        </>
    )
}
