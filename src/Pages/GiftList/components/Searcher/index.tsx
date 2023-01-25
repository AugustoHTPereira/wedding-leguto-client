import { Search2Icon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useDisclosure, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, Input, ModalBody, VStack, StackDivider, StackItem, Flex, Box, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GiftType } from "../../../../Contracts/Gifts";

interface SearcherProps {
    gifts: GiftType[]
}

const Searcher = ({ gifts }: SearcherProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState<string>('');

    return (
        <>
            <IconButton aria-label='search' icon={<Search2Icon />} colorScheme='teal' onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose} size='lg'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Input value={search} onChange={e => setSearch(e.target.value)} variant='flushed' placeholder='Digite aqui para buscar' />
                    </ModalHeader>
                    <ModalBody pb='6'>
                        <VStack spacing='2' divider={<StackDivider />}>
                            {
                                !!search && gifts.filter(x => x.title.toLowerCase().includes(search.toLowerCase())).map(gift => (
                                    <StackItem key={gift.title} w='full'>
                                        <Flex w='full' justifyContent='space-between'>
                                            <Flex align='center'>
                                                <Box>
                                                    {!!gift.pictures && <Image src={gift.pictures[0]} w='10' h='10' objectFit='contain' />}
                                                </Box>
                                                <Box ml='4'>
                                                    <Text fontWeight='semibold' lineHeight='1' fontSize='md'>{gift.title}</Text>
                                                    {!!gift.obtained && (<Text color='gray.400' fontSize='xs'>Este presente já foi reservado.</Text>)}
                                                </Box>
                                            </Flex>
                                            <IconButton as={Link} to={gift.id.toString()} aria-label='acessar' icon={<ArrowForwardIcon />} />
                                        </Flex>
                                    </StackItem>   
                                ))
                            }
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Searcher;