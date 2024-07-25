import React from 'react';
import { useToken, Box, Text, Heading, Flex, Image } from "@chakra-ui/react";
import useWeddingDate from "../../../../Hooks/useWeddingDate";
import BackgroundPhoto from "../../../../Assets/img/IMG_9206.jpg"
import Nome from "../../../../Assets/img/nome-branco.png";

const HomeMainContent = () => {
    const fullHeight = useToken('sizes', '16')
    const { dateStr } = useWeddingDate();

    return (
        <Box
            pt='16'
            px='6'
            bgImage={BackgroundPhoto}
            bgPosition='center'
            bgRepeat='no-repeat'
            bgSize='cover'
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
                backdropFilter='blur(3px)'
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
                    <Image src={Nome} h={300} />
                </Heading>

                <Text
                    textAlign='center'
                    fontSize='2xl'
                    color='white'
                    mt='4'
                    transform='translateY(-50px)'
                >
                    {dateStr}
                </Text>
            </Flex>
        </Box>
    )
}

export default HomeMainContent;