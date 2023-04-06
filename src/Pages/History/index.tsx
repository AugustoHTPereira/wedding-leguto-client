import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import HomeNavbar from '../Home/components/HomeNavbar';
import Image0001 from '../../Assets/img/0001.jpg'
import Image0002 from '../../Assets/img/0002.jpg'
import Image0003 from '../../Assets/img/0003.jpg'
import useWeddingDate from '../../Hooks/useWeddingDate';

const History = () => {
    const { diff: { d: days } } = useWeddingDate();

    return (
        <Box
            w='full'
            minH='100vh'
            bg='black'
        >
            <HomeNavbar />

            <Box px='6'>
                <Box
                    w='full'
                    maxW='container.sm'
                    mx='auto'
                    pt='20'
                    pb='16'
                >
                    <Box
                        mb='12'
                    >
                        <Text
                            textAlign='center'
                            color='white'
                            fontSize='4xl'
                            fontWeight='bold'
                            mb='6'
                        >
                            Nossa história
                        </Text>

                        <Text
                            textAlign='center'
                            color='white'
                            maxW='md'
                            mx='auto'
                            fontSize='lg'
                        >
                            Gostaríamos de compartilhar com você, nosso convidado, um pouco da nossa história.
                        </Text>
                    </Box>

                    <Box color='gray.200'>
                        <Text mb='6'>
                            Podemos dizer que foi amor a primeira vista?
                            <br />
                            Talvez sim.
                        </Text>

                        <Text mb='6'>
                            Tudo começou no caixa do Supermercado Pereira. Onde uma linda menina dos olhos verdes (ou azuis) chamou a atenção de um repositor de gôndulas.
                            <br />
                            Alí mesmo, no mercado, trabalhava uma amiga dessa linda menina, e o menino esperto, porém vergonhoso, pediu o telefone da linda menina para sua amiga.
                        </Text>

                        <Text mb='6'>
                            Papo vai, papo vem, e no dia 9 de junho de 2017 foi o boom do nosso amor. Nosso primeiro beijo.
                        </Text>

                        <Text mb='6'>
                            Passado alguns dias, mais precisamente no dia 18 de junho de 2017, o atual noivo decide então conhecer a família da atual noiva. Aqui então, o nervosismo
                            toma conta de todos. Afinal, o rapazinho do cabelo amarelo que trabalha no Pereira, filho do Sionel, iria pedir a mão da filha do Luiz Paulo em namoro.
                        </Text>

                        <Image
                            src={Image0001}
                            maxHeight='64'
                            mx='auto'
                            mb='4'
                            rounded='base'
                        />

                        <Text textAlign='center' mb='6'>
                            <b>Sim, graças a Deus, tudo ocorreu bem. Uffa!</b>
                            <br />
                            <Text as='span' color='gray.500'>Mas o nervosismo foi grande.</Text>
                        </Text>

                        <Text mb='6'>
                            Toda menina, tem como sonho, receber as alianças de compromisso. Em 30 de setembro de 2017, foi então formalizado o nosso namoro com a entrega das alianças.
                        </Text>

                        <Image
                            src={Image0002}
                            w='75%'
                            maxHeight='64'
                            objectFit='cover'
                            mx='auto'
                            mb='8'
                            rounded='base'
                        />

                        <Text mb='6'>
                            Passaram-se 5 anos de muita alegria, conquistas e aprendizado, decidimos dar um passo além. Decidimos que íamos noivar.
                            <br />
                            Em 18 de junho de 2022, com o apoio de nossas famílias e de Deus, iniciamos nossa nova etapa. <b>Ficamos noivos.</b>
                        </Text>

                        <Image
                            src={Image0003}
                            w='45%'
                            maxHeight='64'
                            objectFit='cover'
                            mx='auto'
                            mb='8'
                            rounded='base'
                        />

                        <Text mb='16'>
                            E para não perder costume nas nossas datas, em {days} dias, mais precisamente no dia 16 de junho de 2023 às 20 horas e 30 minutos, será realizado a
                            nossa cerimônia matrimonial, em Campanha MG, onde esperamos você, nosso convidado, para celebrar conosco a nossa união.
                        </Text>

                        <Text fontSize='3xl' mb='4'>Dedicatória</Text>

                        <Text mb='6'>
                            Desde o início, nosso relacionamento foi regado de muito amor e apoio de nossa famílias.
                            Acreditamos que vale deixar um espaço para os agradecimentos e dedicações aos nossos familiares.
                            <br />
                            <br />

                            Aos nossos pais, somos imensamente gratos por todo o apoio e paciência que tiveram conosco. Os amamos muito.
                        </Text>

                        <Text mb='6' textAlign='center'>
                            Obrigado à todos, em especial à você, que acompanhou pelo menos um pouquinho da nossa jornada até aqui.
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default History;