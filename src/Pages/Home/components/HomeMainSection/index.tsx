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
                    pb='20'
                >
                    <Text
                        mb='1'
                        color='gray.200'
                        fontSize={{ base: 'sm', md: 'md' }}
                    >
                        Restam {days} dias para a cerimônia.
                    </Text>

                    <HStack
                        color='gray.200'
                        spacing='4'
                        divider={<StackDivider opacity='.2' />}
                        mb='4'
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
                        color='gray.200'
                        fontSize={{ base: '5xl', md: '6xl' }}
                        fontWeight='semibold'
                        lineHeight='1'
                        mb='4'
                    >
                        Leilanne e Augusto
                    </Text>

                    <Text
                        color='gray.200'
                        maxW='xl'
                        fontSize={{ base: 'xs', md: 'md' }}
                    >
                        “Deus mudou o teu caminho até juntares com o meu e guardou a tua vida separando-a para mim. Para onde fores, irei; onde tu repousares, repousarei. Teu Deus será o meu Deus. Teu caminho o meu será.”
                        <Text
                            fontWeight='bold'
                            as='span'
                        >
                            {' '}
                            (Rute 1:16,17)
                        </Text>
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

export default HomeMainContent;