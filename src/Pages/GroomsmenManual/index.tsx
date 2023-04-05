import React, { ReactNode } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Texture from '../../Assets/img/absurdity.png';
import Brand from '../../Assets/img/brand.svg';
import Men from '../../Assets/img/men.png';
import Wom from '../../Assets/img/woman.png';
import Bol from '../../Assets/img/bolth.png';
import useIdentityContext from '../../Contexts/IdentityContext';
import HomeNavbar from '../Home/components/HomeNavbar';

const GroomsmensManual: Record<string, string> = {
    "roque e sirlene": Bol,
    "marcelo e cintia": Bol,
    "andré e monique": Bol,
    "hiago e sabrina": Bol,
    "rodrigo e vitória": Bol,
    "milerson e nara": Bol,
    "anderson e dariana": Bol,
    "geisla": Wom,
    "guilherme": Men,
    "fernando": Men,
    "gabrielly": Wom,
    "evellyn": Wom,
    "arisson": Men
}

const GroomsmenManual = () => {
    const {name} = useIdentityContext();

    return (
        <Box bg='black' minH='100vh' w='full' px='6'>
            <HomeNavbar />

            <Box w='full' maxW='sm' mx='auto' mt='6' borderRadius='xl' boxShadow='base' overflow='hidden'>
                <Image src={GroomsmensManual[name.toLowerCase()]} w='full' />
            </Box>
        </Box>
    )
}

export default GroomsmenManual;