import React from 'react';
import { Flex, HStack, StackItem, Box, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HomeDrawer from "../HomeDrawer";
import Brand from '../../../../Assets/img/brand-white.svg';
import useIdentityContext from '../../../../Contexts/IdentityContext';


const HomeNavbar = () => {
    const { type, isSignedIn, signout } = useIdentityContext();

    return (
        <>
            {/* <Box
                h='16'
            /> */}

            <Box
                px='6'
                bg='blackAlpha.600'
                backdropFilter='blur(32px)'
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
                        {
                            !!isSignedIn && type === 'groomsmen' && (
                                <StackItem>
                                    <Text
                                        as={Link}
                                        to='/manual'
                                        color='gray.100'
                                    >
                                        Manual dos padrinhos
                                    </Text>
                                </StackItem>
                            )
                        }

                        <StackItem>
                            <Text
                                as={Link}
                                to='/history'
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
                                to='/help'
                                color='gray.100'
                            >
                                Ajuda
                            </Text>
                        </StackItem>

                        {!!isSignedIn && (
                            <StackItem>
                                <Text
                                    onClick={signout}
                                    color='red.500'
                                >
                                    Sair
                                </Text>
                            </StackItem>
                        )}
                    </HStack>

                    <HomeDrawer />
                </Flex>
            </Box>
        </>
    )
}

export default HomeNavbar;