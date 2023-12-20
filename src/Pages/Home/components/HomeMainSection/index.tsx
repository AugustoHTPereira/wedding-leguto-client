import React from 'react';
import { useToken, HStack, StackDivider, StackItem, Box, Text, Heading, Flex } from "@chakra-ui/react";
import useWeddingDate from "../../../../Hooks/useWeddingDate";
import BackgroundPhoto from "../../../../Assets/img/wedding.avif"
import BackgroundPhoto_SM from "../../../../Assets/img/IMG_7025.jpg"

const HomeMainContent = () => {
    const fullHeight = useToken('sizes', '16')
    const { date } = useWeddingDate();

    return (
        <Box
            pt='16'
            px='6'
            bgImage={BackgroundPhoto}
            bgPosition='center'
            bgRepeat='no-repeat'
            position='relative'
        >
            <Box 
                bg='blackAlpha.400'
                pos='absolute'
                top='0'
                right='0'
                bottom='0'          
                left='0'
                w='full'
                h='100vh'
                backdropFilter='blur(4px) contrast(60%)'
            />

            <Flex
                justifyContent='center'
                alignItems='center'
                flexDir='column'
                mx='auto'
                maxW='container.xl'
                w='full'
                minH={`calc(100vh - ${fullHeight})`}
                position='relative'
            >
                <Heading 
                    transitionDuration='120ms'
                    color='white'
                    fontSize="7xl"
                    textAlign='center'
                    lineHeight='1'
                    textShadow='0 2px 4px rgba(0, 0, 0, 0.2)'
                >
                    Camila e Guilherme
                </Heading>

                <Text
                    textAlign='center'
                    fontSize='2xl'
                    color='white'
                    mt='4'
                >
                    {date.getDate()}-{date.getMonth().toString().padStart(2, '0')}-{date.getFullYear()}
                </Text>
            </Flex>
        </Box>
    )
}

export default HomeMainContent;