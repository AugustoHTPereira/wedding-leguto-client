import React from 'react';
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure, Text, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack, StackItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useIdentityContext from '../../../../Contexts/IdentityContext';

type HomeDrawerProps = {
    theme?: 'light' | 'dark',
}

const HomeDrawer = ({ theme }: HomeDrawerProps) => {
    const { onOpen, ...rest } = useDisclosure();
    const { isSignedIn, type, signout } = useIdentityContext();

    return (
        <>
            <IconButton
                aria-label="Menu hamburguer"
                icon={<HamburgerIcon fontSize='2xl' />}
                textColor={theme === 'light' ? 'black' : 'white'}
                display={{ base: 'initial', md: 'none' }}
                backgroundColor='transparent'
                onClick={onOpen}
            />

            <Drawer {...rest} size='xl'>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton fontSize='xl' top='6' />

                    <DrawerHeader pt='16' pb='8'>
                        <Text
                            fontSize='3xl'
                            maxW='sm'
                            lineHeight='8'
                        >
                            Bem-vindo(a) ao site do nosso casamento
                        </Text>
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack spacing='6'>
                            {
                                !!isSignedIn && type === 'groomsmen' && (
                                    <StackItem w='full'>
                                        <Text
                                            as={Link}
                                            to='/manual'
                                            fontSize='xl'
                                        >
                                            Manual dos padrinhos
                                        </Text>
                                    </StackItem>
                                )
                            }

                            <StackItem w='full'>
                                <Text
                                    as={Link}
                                    to='/history'
                                    fontSize='xl'
                                >
                                    Nossa história
                                </Text>
                            </StackItem>

                            <StackItem w='full'>
                                <Text
                                    as={Link}
                                    to='/gifts'
                                    fontSize='xl'
                                >
                                    Lista de presentes
                                </Text>
                            </StackItem>

                            {
                                !!isSignedIn && (
                                    <StackItem w='full'>
                                        <Text
                                            onClick={signout}
                                            color='red.500'
                                            fontSize='xl'
                                        >
                                            Sair
                                        </Text>
                                    </StackItem>
                                )
                            }
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default HomeDrawer;