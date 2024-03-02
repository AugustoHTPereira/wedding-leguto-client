import React, { useEffect, useState } from 'react';
import { Flex, HStack, StackItem, Box, Text, Image, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HomeDrawer from "../HomeDrawer";
import Dark from '../../../../Assets/img/flor-preto.png';
import Light from '../../../../Assets/img/flor-branco.png';

type HomeNavbarProps = {
    theme?: 'light' | 'dark'
}

const HomeNavbar = ({ theme }: HomeNavbarProps) => {
    const color = theme !== 'light' ? 'white' : 'gray.900';
    const Brand = theme === 'light' ? Dark : Light;

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
                            <Image src={Brand} height={16} />
                        </Heading>

                        <HStack ml='auto' fontSize='xl' color={color} display={{ base: 'none', md: 'flex' }} spacing={6}>
                            <StackItem>
                                <Link to='/history'>Nossa história</Link>
                            </StackItem>
                            <StackItem>
                                <Link to='/gifts'>Lista de presentes</Link>
                            </StackItem>
                        </HStack>
                    </Flex>

                    <HomeDrawer theme={theme} />
                </Flex>
            </Box>
        </>
    )
}

export default HomeNavbar;