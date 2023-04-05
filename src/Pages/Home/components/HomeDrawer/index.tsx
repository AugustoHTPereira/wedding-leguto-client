import React from 'react';
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure, Text, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack, StackItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useIdentityContext from '../../../../Contexts/IdentityContext';

const HomeDrawer = () => {
    const { onOpen, ...rest } = useDisclosure();
    const { isSignedIn, type, signout } = useIdentityContext();

    return (
        <>
            <IconButton
                aria-label="Menu hamburguer"
                icon={<HamburgerIcon fontSize='2xl' />}
                colorScheme='blackAlpha'
                display={{ base: 'initial', md: 'none' }}
                backgroundColor='transparent'
                onClick={onOpen}
            />

            <Drawer {...rest} size='xl'>
                <DrawerOverlay />
                <DrawerContent bg='black'>
                    <DrawerCloseButton color='gray.100' fontSize='xl' top='6' />

                    <DrawerHeader pt='16' pb='8'>
                        <Text
                            color='gray.100'
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
                                            color='gray.100'
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
                                    color='gray.100'
                                    fontSize='xl'
                                >
                                    Nossa história
                                </Text>
                            </StackItem>

                            <StackItem w='full'>
                                <Text
                                    as={Link}
                                    to='/gifts'
                                    color='gray.100'
                                    fontSize='xl'
                                >
                                    Lista de presentes
                                </Text>
                            </StackItem>

                            <StackItem w='full'>
                                <Text
                                    as={Link}
                                    to='/help'
                                    color='gray.100'
                                    fontSize='xl'
                                >
                                    Ajuda
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