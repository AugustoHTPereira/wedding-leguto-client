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
    'augusto e leilanne': Bol,
    'lauanda e alvaro': Bol,
    'isabela e lucas': Bol,
    'íria e marcelo': Bol,
    'adriano e francis': Bol,
    'luciana e giovanni': Bol,
    'ana luísa e chelverson': Bol,
    'angélica e juliano': Bol,
    'luis gustavo': Men,
    'kelly': Wom,
    'fernando': Men,
    'douglas': Men,
    'núbhia': Wom,
    'luísa': Wom,
    'paulo felipe': Men,
}

const GroomsmenManual = () => {
    const { name } = useIdentityContext();

    return (
        <Box minH='100vh' w='full' px='6'>
            <HomeNavbar theme='light' />

            <Box w='full' maxW='sm' mx='auto' borderRadius='xl' boxShadow='base' overflow='hidden'>
                <Image src={GroomsmensManual[name.toLowerCase()]} w='full' />
            </Box>
        </Box>
    )
}

export default GroomsmenManual;