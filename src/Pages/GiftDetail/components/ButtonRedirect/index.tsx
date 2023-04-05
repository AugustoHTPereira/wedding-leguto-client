import React from "react";
import { Box, Button, Flex, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure,Text } from "@chakra-ui/react";
import { GiftType } from "../../../../Contracts/Gifts";

interface ButtonRedirectProps {
    gift: GiftType
}

const ButtonRedirect = ({ gift }: ButtonRedirectProps) => {
    const buttonText = gift.type === "external_link" && !!gift.store && !!gift.link ? "Visualizar na " + gift.store : gift.type === "payment_link" ? "Comprar" : "Consultar os noivos"
    const consult = !gift.link || !gift.store || gift.type == 'contact_bridegroom'
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {!consult && <Button as='a' href={gift?.link} target='_blank' w='full' mt='2' colorScheme='teal' variant='outline' size='lg'>{buttonText}</Button>}
            {!!consult && <Button w='full' mt='2' onClick={onOpen} colorScheme='teal' variant='outline' size='lg'>{buttonText}</Button>}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Consultar os noivos
                    </ModalHeader>

                    <ModalBody pb='6'>
                        <Flex>
                            <Box as={'a'} target='_blank' href="https://wa.me/+55035997387844" flex='1' mr='2'>
                                <Image src='https://bellaangela.com.br/wp-content/uploads/2017/12/vestidos-noivas-11.jpg' w='full' h='32' objectFit='cover' objectPosition='center -15px' borderRadius='xl' mb='4' />
                                <Text color='gray.500' fontSize='sm' lineHeight='1.4' px='2' textAlign='center'>
                                    Enviar mensagem para a noiva
                                </Text>
                            </Box>

                            <Box as={'a'} target='_blank' href="https://wa.me/+55035997387844" flex='1'>
                                <Image src='https://s3-sa-east-1.amazonaws.com/quero-de-casamento/media/blog_image/4GqUciRzVxLg_600x399_mtdhGWCw.jpg' w='full' h='32' objectFit='cover' objectPosition='center' borderRadius='xl' mb='4' />
                                <Text color='gray.500' fontSize='sm' lineHeight='1.4' px='2' textAlign='center'>
                                    Enviar mensagem para o noivo
                                </Text>
                            </Box>
                        </Flex>

                        <Text color='gray.400' mt='4' textAlign='center'>
                            Você será redirecionado ao whatsapp
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ButtonRedirect;