import React from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react';
import HomeNavbar from '../Home/components/HomeNavbar';

const WHATSAPP_URL = 'https://wa.me/+55035997387844?text=Olá, eu não consigo encontrar o código de acesso do site do casamento. Pode me ajudar?';

const Help = () => {
    return (
        <Box
            w='full'
            minH='100vh'
            bg='black'
        >
            <HomeNavbar />

            <Box
                w='full'
                maxW='container.sm'
                mx='auto'
                pt='20'
                pb='16'
            >
                <Text
                    textAlign='center'
                    color='white'
                    fontSize='4xl'
                    fontWeight='bold'
                    mb='12'
                >
                    Central de ajuda
                </Text>

                <Accordion color='white' mb='8'>
                    <AccordionItem borderColor='gray.700'>
                        <AccordionButton>
                            <Text fontWeight='semibold' flex='1' textAlign='left'>
                                Perdi meu convite e não possuo o código de acesso.
                            </Text>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            O código de acesso é gerado randomicamente para cada convidado.
                            Caso o tenha perdido, por favor, envie uma mensagem ao noivo <Text as='a' fontWeight='semibold' color='teal.400' textDecor='underline' href={WHATSAPP_URL} target='_blank'>clicando aqui</Text>.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem borderColor='gray.700'>
                        <AccordionButton>
                            <Text fontWeight='semibold' flex='1' textAlign='left'>
                                O presente que eu selecionei aparece como já selecionado.
                            </Text>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            Não se preocupe, se você selecionou o presente anteriormente, pode ser que você esteja deslogado no site.
                            Para realizar login no site, basta escanear o QRCODE do seu convite apontando a câmera do seu celular, ou se preferir acesse {' '}
                            <Text as='span' color='teal.400'>https://camilaguilherme.com.br/<Text as='span' color='red.400'>{'<'}seu_código{'>'}</Text></Text>, <b>lembre-se de alterar o conteúdo {'<'}seu_código{'>'} em vermelho pelo seu código contido no convite.</b>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem borderColor='gray.700'>
                        <AccordionButton>
                            <Text fontWeight='semibold' flex='1' textAlign='left'>
                                Como faço para selecionar um presente?
                            </Text>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            No rodapé do seu convite, existe um QRCODE, com ele você consegue acessar o site em seu nome.

                            <br />
                            <br />

                            <Box pl='6'>
                                <ul>
                                    <li>
                                        Aponte a câmera do seu celular para o QRCODE disponibilizado no rodapé do seu convite e acesse.
                                        <br />
                                        Se isso não funcionar, no navegador do seu celular/computador, acesse o link abaixo do QRCODE.
                                    </li>

                                    <li>
                                        Ao selecionar o presente, caso você não esteja logado, será solicitado um código de acesso. Esse código pode ser encontrado no seu convite, logo abaixo do QRCODE.
                                    </li>
                                </ul>
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                <Text color='white' textAlign='center'>
                    Criamos esse site com o intúito de centralizar as informações em um meio de comunicação. 
                    Em caso de problemas ou dúvidas, envie um email para <b>augustohtp8@gmail.com</b> ou entre em contato pelo telefone <b>35997387844</b>.
                </Text>
            </Box>
        </Box>
    )
}

export default Help;