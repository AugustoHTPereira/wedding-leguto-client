import React from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Flex 
            w='full' 
            minH='100vh' 
            px='6' 
            alignItems='center' 
            justifyContent='center'>

            <Box>
                <Flex alignItems='center'>
                    <Box borderRight='1px solid' borderColor='gray.100' pr='4' mr='4'>
                        <Text fontSize='5xl' fontWeight='bold' color='teal.700'>
                            404
                        </Text>
                    </Box>

                    <Box maxW='300px'>
                        <Text lineHeight='1' mb='1' fontWeight='semibold' color='gray.700'>Recurso não encontrado</Text>
                        <Text fontSize='sm' lineHeight='1.2' color='gray.500'>O recurso que você está procurando não existe ou está temporariamente indisponível.</Text>
                    </Box>
                </Flex>

                <Box textAlign='center' color='blue.500' mt='4'>
                    <Link to='/'>
                        Voltar ao início
                    </Link>
                </Box>
            </Box>
            
        </Flex>
    )
}

export default NotFound;