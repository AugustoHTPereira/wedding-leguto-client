import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, VStack, StackItem, HStack, Box, Text, Image } from "@chakra-ui/react";
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
        if (!!hash)
            document.querySelector(hash)?.scrollIntoView({behavior: 'smooth', inline: 'start', block: 'start'});
    }, [hash])

    return (
        <Box>
            <Box mb='4'>
                <Text color='gray.500' fontSize='sm'>
                    Querido convidado, não se limite a nossa lista.<br/>Fique a vontade para comprar o presente onde quiser.
                </Text>
            </Box>

            <Box mb='8'>
                <Text mb='2'>Categorias</Text>
                <Flex wrap='wrap' mx='-3'>
                    {
                        categories.map(category => (
                            <Box mb='1' p='2' px='4' bg='white' color='gray.500' mx='1' shadow='base' borderRadius='full' cursor='pointer' fontSize='sm' fontWeight='semibold' lineHeight='1' as={Link} to={{hash: category.toLowerCase().replace(' ', '-')}}>
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
                                    <VStack>
                                        {
                                            gifts.filter(gift => gift.category === category).sort((a, b) => a.title > b.title ? 1 : -1).map(gift => (
                                                <StackItem key={gift.id} w='full'>
                                                    <Flex as={Link} to={gift.id.toString()} align='center' justifyContent='space-between' bg={gift.obtained ? 'gray.50' : 'white'} p='4' pr='6' minH='16' borderRadius='lg' shadow={gift.obtained ? 'none' : 'sm'} color='gray.500'>
                                                        <Flex align='center'>
                                                            <Box mr='2' minW='14'>
                                                                { !!gift.pictures && <Image borderRadius='base' h='12' w='12' objectFit='contain' src={gift.pictures[0]} /> }
                                                            </Box>

                                                            <Box>
                                                                {
                                                                    gift.obtained && (
                                                                        <Text color='yellow.500' mb='0' fontSize='xs'>
                                                                            {!!isSignedIn && (gift.guestsId?.indexOf(guestId) || -1) >= 0 ? "Você selecionou esse presente" : "Este presente já foi selecionado"}
                                                                        </Text>
                                                                    )
                                                                }

                                                                <Text color='gray.700' fontWeight='medium'>
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
                                                            </Box>
                                                        </Flex>

                                                        <Box>
                                                            <ArrowForwardIcon />
                                                        </Box>
                                                    </Flex>
                                                </StackItem>
                                            ))
                                        }
                                    </VStack>
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