import { Box, Button, Text } from '@chakra-ui/react';
import { parseCookies, setCookie } from 'nookies';
import React, { useEffect, useState } from 'react';

const CookieConcent = () => {
    const [isConcent, setIsConcent] = useState<boolean>(false);

    useEffect(() => {
        const { cookie_concent } = parseCookies();
        setIsConcent(!!cookie_concent);
    }, [])

    const markAsConcent = () => {
        setCookie(undefined, "cookie_concent", "true");
        setIsConcent(true);
    }

    if (!!isConcent) return null;

    return (
        <>
            <Box position='fixed' bottom='0' left='0' p='4'>
                <Box p='6' w='full' color='white' maxW='container.sm' bg='blackAlpha.700' backdropFilter='blur(25px)' rounded='base' shadow='base'>
                    <Box mb='4'>
                        <Text fontWeight='semibold'>Este site faz uso de cookies.</Text>
                    </Box>

                    <Box mb='4'>
                        <Text>
                            Nós fazemos uso de cookies para melhorar a sua experiência.
                            Ao continuar navegando pelo site você concorda com essa abordagem.
                        </Text>
                    </Box>

                    <Box>
                        <Button colorScheme='teal' onClick={markAsConcent}>
                            Entendi
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default CookieConcent;