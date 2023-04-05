import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, VStack, StackItem, HStack, Box, Text, Image, SimpleGrid, GridItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import useIdentityContext from "../../../../Contexts/IdentityContext";
import { GiftType } from "../../../../Contracts/Gifts";

interface GiftStackProps {
    gifts: GiftType[]
}

const GiftStack = ({ gifts }: GiftStackProps) => {
    const [categories, setCategories] = useState<string[]>([])
    const { id: guestId, isSignedIn } = useIdentityContext();

    useEffect(() => {
        const cats = gifts.map(x => x.category || '').filter((val, i, self) => self.indexOf(val) === i);
        setCategories(cats);
    }, [gifts])

    const { hash } = useLocation();
    useEffect(() => {
        if (!!hash) {
            document.querySelector(decodeURI(hash))?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
        }
    }, [hash])

    return (
        <Box>
            <Box mb='4'>
                <Text color='gray.500' fontSize='sm'>
                    Querido convidado, não se limite a nossa lista.<br />Fique a vontade para comprar o presente onde quiser.
                </Text>
            </Box>

            <Box mb='8'>
                <Text mb='2'>Categorias</Text>
                <Flex wrap='wrap' mx='-3'>
                    {
                        categories.map(category => (
                            <Box mb='1' p='2' px='4' bg='white' color='gray.500' mx='1' shadow='base' borderRadius='full' cursor='pointer' fontSize='sm' fontWeight='semibold' lineHeight='1' as={Link} to={{ hash: category.toLowerCase().replace(' ', '-') }}>
                                {category}
                            </Box>
                        ))
                    }
                </Flex>
            </Box>

            <VStack>
                {
                    categories.map(category => {
                        return (
                            <StackItem pb='12' w='full' id={category.toLowerCase().replace(' ', '-')}>
                                <Box>
                                    <Box p='6' mx='-6' fontSize='sm' fontWeight='semibold'>
                                        <Text color='gray.700' whiteSpace='nowrap'>{category}</Text>
                                    </Box>
                                </Box>

                                <Box flex='1'>
                                    <SimpleGrid templateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr 1fr' }} gap='6'>
                                        {
                                            gifts.filter(gift => gift.category === category).sort((a, b) => a.title > b.title ? 1 : -1).map(gift => (
                                                <GridItem key={gift.id}>
                                                    <Box
                                                        h='full'
                                                        pb='2'
                                                        borderBottom='1px solid'
                                                        borderBottomColor='gray.200'
                                                        as={Link}
                                                        to={gift.id.toString()}
                                                        display='block'
                                                    >
                                                        <Box mb='4' bg='white' p='2' rounded='md' overflow='hidden'>
                                                            {
                                                                !!gift.pictures && <Image
                                                                    rounded='base'
                                                                    overflow='hidden'
                                                                    h='32'
                                                                    w='full'
                                                                    objectFit='scale-down'
                                                                    src={gift.pictures[0]}
                                                                    filter={gift.obtained ? 'grayscale(1)' : ''}
                                                                    opacity={gift.obtained ? '0.4' : '1'}
                                                                />
                                                            }
                                                        </Box>

                                                        <Box px='2'>
                                                            <Text fontSize='sm' color={gift.obtained ? 'gray.400' : ''}>
                                                                {gift.title}
                                                            </Text>

                                                            {!!gift.metadata && (
                                                                <HStack fontSize='xs' color='gray.500'>
                                                                    {gift.metadata.map(metadata => {
                                                                        if (metadata.key === "Voltage" && metadata.value === "220V") {
                                                                            return (
                                                                                <StackItem color='red.500' fontWeight='semibold'>
                                                                                    <Text>{metadata.value}</Text>
                                                                                </StackItem>
                                                                            )
                                                                        }

                                                                        return (
                                                                            <StackItem>
                                                                                <Text>{metadata.value}</Text>
                                                                            </StackItem>
                                                                        )
                                                                    })}
                                                                </HStack>
                                                            )}

                                                            {
                                                                gift.obtained && (
                                                                    <Text color={gift.obtainedByMe ? 'green.500' : 'yellow.500'} mt='2' fontSize='xs' fontWeight='semibold'>
                                                                        {!!isSignedIn && !!gift.obtainedByMe ? "MUITO OBRIGADO! VOCÊ SELECIONOU ESTE PRESENTE" : "ESTE PRESENTE JÁ FOI SELECIONADO"}
                                                                    </Text>
                                                                )
                                                            }
                                                        </Box>
                                                    </Box>
                                                </GridItem>
                                            ))
                                        }
                                    </SimpleGrid>
                                </Box>
                            </StackItem>
                        );
                    })
                }
            </VStack>
        </Box>
    )
}

export default GiftStack;