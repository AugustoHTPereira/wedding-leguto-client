import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import useIdentityContext from '../../Contexts/IdentityContext';

const AutomaticLogin = () => {
    const { id } = useParams();
    const { isSignedIn, code, signin, isLoading } = useIdentityContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id || (code == id && isSignedIn)) {
            navigate("/")
            return;
        }

        handleLogin(id)
    }, [ id ])

    const handleLogin = async (id: string) => {
        await signin({
            code: id
        });
    }

    return (
        <Box w='full' px='6'>
            <Flex justifyContent='center' alignItems='center' maxW='container.sm' w='full' minH='100vh' mx='auto' textAlign='center'>
                <Text fontWeight='semibold'>{ isLoading || code != id ? `Estamos autenticando o código ${id}. Por favor, aguarde...` : `Redirecionando...` }</Text>
            </Flex>
        </Box>
    )
}

export default AutomaticLogin;