import React, { useEffect, useState } from "react";
import { Box, Divider, Flex, GridItem, HStack, IconButton, SimpleGrid, Skeleton, SkeletonText, StackItem, Switch, Text, useToast, Image } from "@chakra-ui/react"
import { Link, useNavigate } from 'react-router-dom';
import Texture from '../../Assets/img/absurdity.png';
import Brand from '../../Assets/img/brand.svg';
import FileUploadContainer, { UploadedFile } from '../../Components/FileUploadContainer';
import { DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import useIdentityContext from "../../Contexts/IdentityContext";
import api from "../../Services/API";
import { Axios, isAxiosError } from "axios";

export interface Picture {
    originalUrl: string,
    id: number,
    public: boolean,
    owner: string,
}

const Fototeca = () => {
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [savedPictures, setSavedPicture] = useState<Picture[]>();
    const { id, signout } = useIdentityContext();
    const toast = useToast();
    const navigate = useNavigate();

    const fetchPictures = async () => {
        setIsFetching(true);
        const response = await api.get('/picture?guestId=' + id + "&onlypublic=false")
        console.log(response.data)
        setSavedPicture(response.data);
        setIsFetching(false);
    }

    const handleUploadFiles = async (files: UploadedFile[]) => {
        const form = new FormData();
        files.forEach((file, i) => {
            form.append(`Pictures[${i}].Public`, 'true');
            form.append(`Pictures[${i}].File`, file.file);
        });

        try {
            await api.postForm('/picture', form);
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.status)
                toast({
                    title: "Falha",
                    description: "O login falhou."
                })
                
                signout();
                navigate("/");
                return;
            }
        }
        
        toast({ title: 'Sucesso!', description: 'Seus arquivos foram salvos com sucesso.', colorScheme: 'green' })
        fetchPictures();
    }

    const handleDeleteFile = async (id: number) => {
        setSavedPicture(prev => prev?.filter(x => x.id !== id));
        await api.delete(`/picture/${id}`);
    }

    const handleUpdatePrivacy = async (id: number) => {
        await api.put(`/picture/${id}/toggleprivacy`);
    }

    useEffect(() => {
        if (!!id)
            fetchPictures();
    }, [id]);

    return (
        <Box bgImage={Texture} bgSize='4px' minH='100vh' w='full' px='6'>
            <Box pt='6' mx='auto' w='max-content'>
                <Link to="/">
                    <Image src={Brand} w='16' mx='auto' />
                </Link>

                <Text textAlign='center' fontSize='sm' mt='2' fontWeight='medium'>FOTOTECA</Text>
            </Box>
            
            <Box mt='6' w='full' maxWidth='container.md' mx='auto'>
                <FileUploadContainer onUpload={handleUploadFiles} />
            </Box>

            {
                isFetching && (
                    <Box w='full' maxWidth='container.md' mx='auto' mt='6'>
                        <Skeleton h='2' maxW='200px' mb='2' w='full' />
                        <Skeleton h='2' maxW='400px' mb='2' w='full' />
                        <Skeleton h='2' maxW='300px' mb='2' w='full' />
                        <Skeleton h='2' maxW='350px' mb='4' w='full' />

                        <HStack spacing='2' mb='4'>
                            <Skeleton maxW='120px' h='120px' w='full' />
                            <Skeleton maxW='120px' h='120px' w='full' />
                            <Skeleton maxW='120px' h='120px' w='full' />
                            <Skeleton maxW='120px' h='120px' w='full' />
                            <Skeleton maxW='120px' h='120px' w='full' />
                        </HStack>
                    </Box>
                )
            }

            {           
                !!savedPictures && (savedPictures?.length ?? 0) > 0 && !isFetching && (
                    <>
                        <Box w='full' maxWidth='container.md' mx='auto' mb='4' mt='6'>
                            <Text fontWeight='medium' fontSize='sm' color='gray.500'>Arquivos salvos na fototeca</Text>
                            <Text fontSize='xs' color='gray.500'>Os arquivos públicos poderão ser visualizados na tela inicial do site.</Text>
                            <Text fontSize='xs' color='gray.500'>Para privar um arquivo, assinale-o como privado desabilitando o campo azul.</Text>
                            <Text fontWeight='medium' fontSize='xs' color='gray.500'>Apenas você e os noivos poderão visualizar os arquivos privados.</Text>
                        </Box>
                        <SimpleGrid w='full' maxWidth='container.md' mx='auto' mb='4' spacing='2' templateColumns={{base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)'}}>
                            {
                                savedPictures.map(picture => (
                                    <GridItem key={picture.id} position='relative' rounded='base' overflow='hidden' height='120px'>
                                        <Box bg='gray.200'>
                                            <Image src={picture.originalUrl} alt={picture.originalUrl} width='150' height='150' style={{ objectFit: 'cover', width: '100%' }} />
                                        </Box>

                                        <Flex justifyContent='space-between' position='absolute' bottom='0' padding='2' bg='whiteAlpha.400' w='full' backdropFilter='blur(4px)' alignItems='center'>
                                            <IconButton aria-label="delete" icon={<ExternalLinkIcon />} colorScheme='teal' size='xs' as={'a'} href={picture.originalUrl} target='_blank' />
                                            <Switch onChange={() => handleUpdatePrivacy(picture.id)} defaultChecked={picture.public} title="Indica se é publica ou não" size='sm' />
                                            <IconButton aria-label="delete" icon={<DeleteIcon />} colorScheme='red' size='xs' onClick={() => handleDeleteFile(picture.id)} />
                                        </Flex>
                                    </GridItem>
                                ))
                            }
                        </SimpleGrid>
                    </>
                )
            }
            
            {
                (savedPictures?.length ?? 0) == 0 && !isFetching && (
                    <Text mt='6' fontSize='xs' fontWeight='semibold' textAlign='center' textTransform='uppercase' color='gray.700'>
                        Você ainda não adicionou nenhum arquivo
                    </Text>    
                )
            }
        </Box>
    )
}

export default Fototeca;

