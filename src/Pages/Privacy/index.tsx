import React from 'react';
import { Box, Heading, Image, StackItem, Text, VStack } from '@chakra-ui/react';
import Brand from '../../Assets/img/flor-preto.png'

const Privacy = () => {
    return (
        <Box px='6' w='full'>
            <Box w='full' maxW='container.sm' mx='auto' pt='8'>
                <Image src={Brand} w='24' />

                <Heading mt='12' maxW='300px'>Política de uso e privacidade</Heading>

                <Box mt='12'>
                    <Text mb='10'>
                        Esta aplicação é destinada à divulgação da lista de presentes e fotos do casamento de Leilanne e Augusto.
                    </Text>

                    <Text mb='10'>
                        Ficam reservados aos responsáveis pelo desenvolvimento e manutenção da aplicação, o direito de atualizar e ou exclui-la a qualquer momento sem aviso prévio.
                    </Text>

                    <Text mb='2'>
                        A aplicação faz uso da tecnologia de cookies para:
                    </Text>

                    <VStack mb='10'>
                        <StackItem w='full'>
                            <Text>Armazenar informações de acesso dos convidados na plataforma.</Text>
                        </StackItem>
                    </VStack>

                    <Text mb='10'>
                        Todos os arquivos enviados na plataforma terão o grau de privacidade público ou privado, onde arquivos públicos poderão ser disponibilizados em toda a aplicação, enquanto arquivos privados ficarão restritos aos noivos e ao seu proprietário podendo serem excluídos a qualquer momento sem aviso prévio.
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

export default Privacy;