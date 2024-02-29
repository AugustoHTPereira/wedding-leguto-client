import React from 'react';
import { Box, Text, Image, Flex, Button, HStack, StackDivider, StackItem } from '@chakra-ui/react';
import Img from '../../../../Assets/img/photo-1520854221256-17451cc331bf.avif'
import useWeddingDate from '../../../../Hooks/useWeddingDate';
import useIdentityContext from '../../../../Contexts/IdentityContext';

const HomeWelcomeSection = () => {
    const {date, diff: { d }} = useWeddingDate();
    const { name } = useIdentityContext();

    const getWelcomeMessage = () => {
        if (!name) 
            return 'Sejam bem-vindos, amigos e familiares!';

        if (name.indexOf(' e '))
            return `Sejam bem vindos, ${name}!`;

        return `Seja bem vindo, ${name}!`;
    }
    
    return (
        <Box
            color='gray.900'
        >
            <Box px='6' py='32' pb='72' bg='#e8d7cc'>
                <Box
                    mx='auto'
                    maxW='container.xl'
                    w='full'
                >
                    <Text
                        fontSize='3xl'
                        textAlign='center'
                        mb='4'
                    >
                        {getWelcomeMessage()}
                    </Text>

                    <HStack
                        spacing='4'
                        mb='4'
                        textAlign='center'
                        fontSize='xl'
                        divider={<StackDivider opacity='.6' borderColor='black' />}
                        flexDir={{ base: 'column', md: 'row' }}
                        justifyContent='center'
                    >
                        <StackItem w={{ base: 'full', md: 'unset' }}>
                            <Text>{date.getDate()}-{date.getMonth().toString().padStart(2, '0')}-{date.getFullYear()}</Text>
                        </StackItem>
                        <StackItem w={{ base: 'full', md: 'unset' }}>
                            <Text>{date.getHours()}:{date.getMinutes().toString().padStart(2, '0')}h</Text>
                        </StackItem>
                        <StackItem w={{ base: 'full', md: 'unset' }}>
                            <Text>Monsenhor Paulo, MG</Text>
                        </StackItem>
                    </HStack>

                    <Text
                        textAlign='center'
                        fontSize='xl'
                    >
                        Restam {d} dias para a cerimônia.
                    </Text>
                </Box>
            </Box>

            <Box 
                bg='white'
                w='full'
            >
                <Box
                    w='full'
                    maxW='container.lg'
                    mx='auto'
                    transform='translateY(-132px)'
                >
                    <Flex flexDir={{ base:'column', md: 'row' }}>
                        <Box
                            px={{base: '6', md: 'unset'}}
                        >
                            <Image 
                                src={Img}
                                w='full'
                                maxW='420'
                            />
                        </Box>

                        <Box>
                            <Box pl={{base: '6', md: '12'}} pt='6'>
                                <Text
                                    fontSize='44'
                                    >
                                    Olá pessoal!
                                </Text>
                            </Box>

                            <Box 
                                pl={{base: '6', md: '20'}}
                                pr={{base: '6', md: '0'}}
                                mt={{base: '4', md: '20'}}
                            >
                                <Text
                                    fontSize='2xl'
                                    lineHeight='1.4'
                                >
                                    [Nossa história]
                                </Text>
                            </Box>
                        </Box>
                    </Flex>

                    <Flex
                        justifyContent='center'
                        mt='20'
                        pl={{base: '0', md: '20'}}
                        position='relative'
                        px={{base: '6', md: 'unset'}}
                        pb={{base: '6', md: 'unset'}}
                    >
                        <Box 
                            h='340px'
                            w='1px'
                            bg='black'
                            position='absolute'
                            top='-250px'
                            mr='24'
                            display={{base: 'none', md: 'block'}}
                        />

                        <Button
                            rounded='0'
                            bg='#9B7449'
                            color='white'
                            size='lg'
                            px='14'
                            py='7'
                            w={{base: 'full', md: 'unset'}}
                            _hover={{
                                bg:'#9B7449'
                            }}
                        >
                            NOSSA HISTÓRIA
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}

export default HomeWelcomeSection;