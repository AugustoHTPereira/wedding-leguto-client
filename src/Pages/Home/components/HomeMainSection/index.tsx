import React from 'react';
import { useToken, HStack, StackDivider, StackItem, Box, Text } from "@chakra-ui/react";
import useWeddingDate from "../../../../Hooks/useWeddingDate";
import BackgroundPhoto from "../../../../Assets/img/IMG_7635.jpg"
import BackgroundPhoto_SM from "../../../../Assets/img/IMG_7025.jpg"

const HomeMainContent = () => {
    const fullHeight = useToken('sizes', '16')
    const { diff: { d: days } } = useWeddingDate();

    return (
        <Box
            pt='16'
            px='6'
            bgImage={{ base: BackgroundPhoto_SM, lg: BackgroundPhoto }}
            bgPosition={{
                base: '',
                lg: 'center 10%'
            }}
            bgSize={{
                base: 'cover',
                lg: ''
            }}
            bgRepeat='no-repeat'
            position='relative'
        >
            <Box 
                display={{ base: 'block', lg: 'none' }}
                position='absolute' 
                bottom='0'
                left='0'
                right='0'
                bg='linear-gradient(0deg, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0) 100%)'
                height='50vh'
            />

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
                        color='white'
                        textShadow='0 2px 32px #00000099'
                        fontSize='6xl'
                        fontWeight='bold'
                        lineHeight='1'
                        letterSpacing='wider'
                    >
                        LEGUTO
                    </Text>

                    <Text
                        color='white'
                        textShadow='0 2px 32px #00000099'
                        mb='4'
                        lineHeight='1'
                        letterSpacing='wide'
                    >
                        LEILANNE E AUGUSTO
                    </Text>

                    <HStack
                        color='white'
                        textShadow='0 2px 32px #00000099'
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
                        color='white'
                        textShadow='0 2px 32px #00000099'
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