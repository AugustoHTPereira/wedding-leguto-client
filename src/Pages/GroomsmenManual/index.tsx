import React, { ReactNode } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Texture from '../../Assets/img/absurdity.png';
import Brand from '../../Assets/img/brand.svg';
import Men from '../../Assets/img/men.png';
import Wom from '../../Assets/img/woman.png';
import Bol from '../../Assets/img/bolth.png';
import useIdentityContext from '../../Contexts/IdentityContext';

const GroomsmensManual: Record<string, string> = {
    "Roque e Sirlene": Bol,
    "Marcelo e Cintia": Bol,
    "André e Monique": Bol,
    "Hiago e Sabrina": Bol,
    "Rodrigo e Vitória": Bol,
    "Milerson e Nara": Bol,
    "Anderson e Dariana": Bol,
    "Geisla": Wom,
    "Guilherme": Men,
    "Fernando": Men,
    "Gabrielly": Wom,
    "Evellyn": Wom,
    "Arisson": Men
}

const GroomsmenManual = () => {
    const {name} = useIdentityContext();

    return (
        <Box bgImage={Texture} bgSize='4px' minH='100vh' w='full' px='6'>
            <Box pt='6' mx='auto' w='max-content'>
                <Link to="/">
                    <Image src={Brand} w='16' mx='auto' />
                </Link>

                <Text textAlign='center' fontSize='sm' mt='2' fontWeight='medium'>MANUAL DOS PADRINHOS</Text>
            </Box>

            <Box w='full' maxW='container.sm' mx='auto' mt='6' borderRadius='base' boxShadow='base'>
                <Image src={GroomsmensManual[name]} w='full' />
            </Box>
        </Box>
    )
}

export default GroomsmenManual;