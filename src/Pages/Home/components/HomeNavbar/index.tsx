import React, { useEffect, useState } from 'react';
import { Flex, HStack, StackItem, Box, Text, Image, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HomeDrawer from "../HomeDrawer";
import Brand from '../../../../Assets/img/brand-white.svg';
import useIdentityContext from '../../../../Contexts/IdentityContext';

type HomeNavbarProps = {
    theme?: 'light' | 'dark'
}

const HomeNavbar = ({ theme }: HomeNavbarProps) => {
    const { name } = useIdentityContext();
    const color = theme !== 'light' ? 'white' : 'gray.900';

    return (
        <>
            <Box
                px='6'
                position='absolute'
                zIndex='docked'
                left='0'
                top='0'
                right='0'
                transitionDuration='120ms'
                h='56px'
            >
                <Flex
                    align='center'
                >
                    <Flex
                        align='center'
                        position='relative'
                        mx='auto'
                        maxW='container.xl'
                        w='full'
                        h='16'
                        zIndex='99'
                    >
                        <Heading 
                            as={Link}
                            to='/'
                            transitionDuration='120ms'
                            color={color}
                            fontSize="5xl"
                            textShadow='0 4px 4px rgba(0, 0, 0, 0.1)'
                        >
                            CeG
                        </Heading>

                        <HStack ml='auto' fontSize='xl' color={color}>
                            <StackItem>
                                <Link to='/gifts'>Lista de presentes</Link>
                            </StackItem>
                        </HStack>
                    </Flex>

                    <HomeDrawer />
                </Flex>
            </Box>
        </>
    )
}

export default HomeNavbar;