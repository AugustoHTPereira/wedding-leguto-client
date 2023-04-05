import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const HomeWelcomeSection = () => {
    return (
        <Box px='6' py='20' bg='gray.200'>
            <Box
                mx='auto'
                maxW='container.xl'
                w='full'
            >
                <Text
                    fontSize='3xl'
                    textAlign='center'
                    mb='4'
                >
                    Sejam bem-vindos, amigos e familiares!
                </Text>
                <Text
                    textAlign='center'
                    maxW='xl'
                    mx='auto'
                >
                    Nós, com o apoio de nossa família e de Deus, vamos nos casar no dia <b>16 de junho de 2023</b>. Contamos com a sua presença na <b>Catedral de Santo Antônio</b> em <b>Campanha, MG</b>.
                </Text>
            </Box>
        </Box>
    )
}

export default HomeWelcomeSection;