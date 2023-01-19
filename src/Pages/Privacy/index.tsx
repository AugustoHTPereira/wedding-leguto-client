import React from 'react';
import { Box, Heading, Image, StackItem, Text, VStack } from '@chakra-ui/react';
import Brand from '../../Assets/img/brand.svg'

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

                    <Text mb='10'>
                        A plataforma fará uso da Graph API desenvolvida pelo Instagram a fim de captar publicações que possuem a menção aos perfis <Text as='a' href='https://instagram.com/augustohtp' textDecor='underline'>@augustohtp</Text> e <Text as='a' href='https://instagram.com/leilannebz' textDecor='underline'>@leilannebz</Text> ou à hashtag <Text as='a' href='https://instagram.com/explore/tags/leguto' textDecor='underline'>#leguto</Text>.
                    </Text>
                </Box>

                <Box mt='16'>
                    <Text>
                        Em caso de dúvidas e/ou problemas, entre em contato pelo e-mail: <Text textDecor='underline' href="mailto:augustohtp8@gmail.com" as='a' target='_blank'>augustohtp8@gmail.com</Text>
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

export default Privacy;