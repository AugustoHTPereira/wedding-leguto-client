import React from 'react';
import { useToken, HStack, StackDivider, StackItem, Box, Text } from "@chakra-ui/react";
import useWeddingDate from "../../../../Hooks/useWeddingDate";

const HomeMainContent = () => {
    const fullHeight = useToken('sizes', '16')
    const { diff: { d: days } } = useWeddingDate();

    return (
        <Box
            px='6'
        >
            <Box
                mx='auto'
                maxW='container.xl'
                w='full'
                minH={`calc(100vh - ${fullHeight})`}
                position='relative'
            >
                <Box
                    position='absolute'
                    bottom='0'
                    pb='24'
                >

                    <Text
                        color='gray.200'
                        fontSize='6xl'
                        fontWeight='bold'
                        lineHeight='1'
                        letterSpacing='wider'
                    >
                        LEGUTO
                    </Text>

                    <Text
                        color='gray.200'
                        mb='4'
                        lineHeight='1'
                        letterSpacing='wide'
                    >
                        LEILANNE E AUGUSTO
                    </Text>

                    <HStack
                        color='gray.200'
                        spacing='4'
                        mb='4'
                        divider={<StackDivider opacity='.2' />}
                        fontSize={{ base: 'sm', md: 'md' }}
                        flexDir={{ base: 'column', md: 'row' }}
                    >
                        <StackItem w={{ base: 'full', md: 'unset' }}>
                            <Text>16.06.2023</Text>
                        </StackItem>
                        <StackItem w={{ base: 'full', md: 'unset' }}>
                            <Text>20:30h</Text>
                        </StackItem>
                        <StackItem w={{ base: 'full', md: 'unset' }}>
                            <Text>Campanha, MG</Text>
                        </StackItem>
                    </HStack>
                    
                    <Text
                        mb='1'
                        color='gray.200'
                        fontSize={{ base: 'sm', md: 'md' }}
                        fontWeight='semibold'
                    >
                        Restam {days} dias para a cerimônia.
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

export default HomeMainContent;