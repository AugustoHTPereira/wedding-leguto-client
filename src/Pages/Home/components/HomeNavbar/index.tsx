import React from 'react';
import { Flex, HStack, StackItem, Box, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HomeDrawer from "../HomeDrawer";
import Brand from '../../../../Assets/img/brand-white.svg';


const HomeNavbar = () => {
    return (
        <>
            <Box
                h='16'
            />

            <Box
                px='6'
                bg='black'
                borderBottom='1px'
                borderBottomColor='whiteAlpha.100'
                position='fixed'
                zIndex='docked'
                left='0'
                top='0'
                right='0'
            >
                <Flex
                    align='center'
                    justify='space-between'
                    mx='auto'
                    maxW='container.xl'
                    w='full'
                    h='16'
                >
                    <Link to='/'>
                        <Image src={Brand} h='8' />
                    </Link>

                    <HStack spacing='8' display={{ base: 'none', md: 'flex' }}>
                        <StackItem>
                            <Text
                                as={Link}
                                to='/gifts'
                                color='gray.100'
                            >
                                Nossa história
                            </Text>
                        </StackItem>

                        <StackItem>
                            <Text
                                as={Link}
                                to='/gifts'
                                color='gray.100'
                            >
                                Lista de presentes
                            </Text>
                        </StackItem>

                        <StackItem>
                            <Text
                                as={Link}
                                to='/gifts'
                                color='gray.100'
                            >
                                Ajuda
                            </Text>
                        </StackItem>
                    </HStack>

                    <HomeDrawer />
                </Flex>
            </Box>
        </>
    )
}

export default HomeNavbar;